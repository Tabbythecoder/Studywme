using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PlayerController : MonoBehaviour
{
    [Header("--- Di chuyển (Movement - FPS Style) ---")]
    [Tooltip("Tốc độ đi bộ bình thường")]
    public float walkSpeed = 8f;

    [Tooltip("Tốc độ chạy nhanh (khi giữ phím Left Shift)")]
    public float sprintSpeed = 12f;

    [Header("--- Nhảy (Jumping) ---")]
    [Tooltip("Lực nhảy")]
    public float jumpForce = 6.5f;

    [Tooltip("Số lần nhảy tối đa trước khi chạm đất (1 = Nhảy đơn, 2 = Double Jump)")]
    public int maxJumps = 1;

    [Tooltip("Hệ số gia tốc rơi (giúp nhân vật rơi đầm tay, không bị lơ lửng)")]
    public float fallMultiplier = 2.5f;

    [Tooltip("Layer của mặt đất")]
    public LayerMask groundLayer;

    [Header("--- Lướt / Dash (Phím F - Ultrakill Style) ---")]
    [Tooltip("Tốc độ lướt cực nhanh")]
    public float dashSpeed = 26f;

    [Tooltip("Thời gian của 1 cú dash (giây)")]
    public float dashDuration = 0.18f;

    [Tooltip("Số vạch Dash tối đa (Ultrakill có 3 vạch)")]
    public int maxDashCharges = 3;

    [Tooltip("Thời gian hồi lại 1 vạch Dash (giây)")]
    public float dashRechargeRate = 1.2f;

    [Tooltip("Có miễn nhiễm sát thương (I-Frames) khi đang Dash không")]
    public bool invulnerableDuringDash = true;

    [Header("--- Trượt dài / Slide (Phím Left Ctrl trên mặt đất) ---")]
    [Tooltip("Tốc độ bắt đầu trượt (nhanh hơn tốc độ chạy)")]
    public float slideStartSpeed = 18f;

    [Tooltip("Tốc độ trượt tối thiểu khi duy trì giữ phím Ctrl")]
    public float slideMinSpeed = 10f;

    [Tooltip("Độ ma sát giảm tốc khi trượt (càng nhỏ trượt càng xa)")]
    public float slideDecay = 4f;

    [Tooltip("Lực bật cao khi vừa trượt vừa bấm Space (Slide Jump)")]
    public float slideJumpForce = 7.5f;

    [Header("--- Dậm đất / Ground Slam (Phím Left Ctrl trên không) ---")]
    [Tooltip("Tốc độ lao thẳng xuống đất khi bấm Ctrl trên không")]
    public float slamSpeed = 35f;

    [Tooltip("Lực nảy siêu cao khi bấm Space ngay sau khi vừa tiếp đất Slam (Slam Super Jump)")]
    public float slamJumpForce = 12f;

    [Header("--- Bắn súng / Gun (Chuột trái) ---")]
    [Tooltip("Sát thương mỗi phát bắn")]
    public float gunDamage = 25f;

    [Tooltip("Khoảng cách bắn tối đa")]
    public float gunRange = 50f;

    [Tooltip("Thời gian giãn cách giữa các phát bắn (giây)")]
    public float fireRate = 0.2f;

    [Header("--- Thuộc tính Máu (Health System) ---")]
    [Tooltip("Lượng máu tối đa")]
    public float maxHealth = 100f;

    [Tooltip("Lượng máu hiện tại")]
    public float currentHealth;

    [Header("--- Hiển thị Debug UI & Phím Test ---")]
    [Tooltip("Bật hiển thị thanh máu, vạch Dash và tâm ngắm trực tiếp trên màn hình Game")]
    public bool showDebugUI = true;

    [Tooltip("Bật phím K (mất máu) và H (hồi máu) để bạn tự test")]
    public bool enableTestKeys = true;

    // Trạng thái công khai để các script khác có thể đọc
    public bool isDead { get; private set; }
    public bool isDashing { get; private set; }
    public bool isSliding { get; private set; }
    public bool isSlamming { get; private set; }
    public int currentDashCharges { get; private set; }

    // Biến nội bộ
    private Rigidbody rb;
    private Collider col;
    private bool isGrounded;
    private int jumpsRemaining;

    // Dash internal
    private float dashTimer;
    private Vector3 dashDirection;
    private float dashRechargeTimer;

    // Slide internal
    private Vector3 slideDirection;
    private float currentSlideSpeed;
    private Vector3 originalScale;
    private Vector3 slideScale;

    // Slam internal
    private float slamJumpWindow;

    // Gun internal
    private float fireTimer;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        if (rb == null)
        {
            rb = gameObject.AddComponent<Rigidbody>();
        }

        col = GetComponent<Collider>();
        rb.freezeRotation = true;

        // Khởi tạo máu
        currentHealth = maxHealth;
        isDead = false;

        // Khởi tạo Dash
        currentDashCharges = maxDashCharges;

        // Khởi tạo Scale khi trượt (hạ thấp 50% chiều cao như Ultrakill)
        originalScale = transform.localScale;
        slideScale = new Vector3(originalScale.x, originalScale.y * 0.5f, originalScale.z);

        jumpsRemaining = maxJumps;
    }

    void Update()
    {
        if (isDead) return;

        // Phím test sát thương & hồi máu nhanh
        if (enableTestKeys)
        {
            if (Input.GetKeyDown(KeyCode.K)) TakeDamage(20f);
            if (Input.GetKeyDown(KeyCode.H)) Heal(20f);
        }

        // Đếm ngược thời gian cửa sổ Slam Super Jump
        if (slamJumpWindow > 0f)
        {
            slamJumpWindow -= Time.deltaTime;
        }

        // 1. Kiểm tra mặt đất
        isGrounded = CheckGrounded();
        if (isGrounded && !isSliding)
        {
            jumpsRemaining = maxJumps;
        }

        // 2. Nhận tín hiệu điều khiển di chuyển theo góc nhìn nhân vật (A, W, S, D)
        // W: Tiến lên theo hướng mặt (transform.forward)
        // S: Lùi xuống theo hướng ngược lại (-transform.forward)
        // A: Đi sang trái (Strafe Left: -transform.right)
        // D: Đi sang phải (Strafe Right: transform.right)
        float horizontal = Input.GetAxisRaw("Horizontal"); // A (-1) / D (+1)
        float vertical = Input.GetAxisRaw("Vertical");     // S (-1) / W (+1)

        Vector3 moveDir = (transform.forward * vertical + transform.right * horizontal).normalized;

        // 3. Xử lý Dash (Phím F)
        HandleDash(moveDir);

        // 4. Xử lý Slide (Ctrl trên đất) & Slam (Ctrl trên không)
        HandleSlideAndSlam(moveDir);

        // 5. Xử lý Nhảy & Slide/Slam Jump (Phím Space)
        HandleJump();

        // 6. Xử lý Bắn súng (Chuột trái)
        HandleShooting();

        // 7. Di chuyển thông thường (khi không Dash, Slide, hay Slam)
        if (!isDashing && !isSliding && !isSlamming)
        {
            bool isSprinting = Input.GetKey(KeyCode.LeftShift);
            float speed = isSprinting ? sprintSpeed : walkSpeed;
            Vector3 targetVelocity = moveDir * speed;

            SetVelocity(new Vector3(targetVelocity.x, GetVelocity().y, targetVelocity.z));
        }

        // 8. Tăng trọng lực rơi tự nhiên khi không slam/dash
        ApplyBetterFall();

        // 9. Hồi lại vạch Dash
        RechargeDash();
    }

    #region --- XỬ LÝ DASH (PHÍM F) ---
    void HandleDash(Vector3 moveDir)
    {
        // Kích hoạt Dash khi nhấn F và còn vạch dash
        if (Input.GetKeyDown(KeyCode.F) && currentDashCharges > 0 && !isDashing)
        {
            // Nếu đang di chuyển theo WASD thì lướt theo hướng đó, nếu đứng yên thì lướt thẳng về phía trước mặt
            dashDirection = moveDir.magnitude > 0.1f ? moveDir : transform.forward;
            dashDirection.y = 0;
            dashDirection.Normalize();

            isDashing = true;
            dashTimer = dashDuration;
            currentDashCharges--;

            if (isSliding) StopSlide();
            if (isSlamming) isSlamming = false;

            rb.useGravity = false;
        }

        if (isDashing)
        {
            dashTimer -= Time.deltaTime;
            SetVelocity(dashDirection * dashSpeed);

            if (dashTimer <= 0)
            {
                isDashing = false;
                rb.useGravity = true;
                SetVelocity(dashDirection * walkSpeed);
            }
        }
    }

    void RechargeDash()
    {
        if (currentDashCharges < maxDashCharges)
        {
            dashRechargeTimer += Time.deltaTime;
            if (dashRechargeTimer >= dashRechargeRate)
            {
                currentDashCharges++;
                dashRechargeTimer = 0f;
            }
        }
        else
        {
            dashRechargeTimer = 0f;
        }
    }
    #endregion

    #region --- XỬ LÝ SLIDE & GROUND SLAM (PHÍM LEFT CTRL) ---
    void HandleSlideAndSlam(Vector3 moveDir)
    {
        // Bấm phím Left Ctrl
        if (Input.GetKeyDown(KeyCode.LeftControl) && !isDashing)
        {
            // Nếu đang trên đất -> SLIDE TRƯỢT DÀI
            if (isGrounded && !isSliding)
            {
                StartSlide(moveDir);
            }
            // Nếu đang trên không -> GROUND SLAM DẬM ĐẤT
            else if (!isGrounded && !isSlamming)
            {
                StartSlam();
            }
        }

        // Xử lý khi đang Slide
        if (isSliding)
        {
            if (Input.GetKeyUp(KeyCode.LeftControl) || !isGrounded)
            {
                StopSlide();
                return;
            }

            // Cho phép bẻ lái nhẹ góc trượt bằng các phím A/D khi đang trượt
            if (moveDir.magnitude > 0.1f)
            {
                slideDirection = Vector3.Lerp(slideDirection, moveDir, 3f * Time.deltaTime).normalized;
            }

            currentSlideSpeed = Mathf.Max(currentSlideSpeed - slideDecay * Time.deltaTime, slideMinSpeed);
            SetVelocity(new Vector3(slideDirection.x * currentSlideSpeed, GetVelocity().y, slideDirection.z * currentSlideSpeed));
        }

        // Xử lý khi đang Ground Slam
        if (isSlamming)
        {
            SetVelocity(new Vector3(0f, -slamSpeed, 0f));

            if (isGrounded)
            {
                isSlamming = false;
                slamJumpWindow = 0.35f; // Cửa sổ bấm Space để Slam Super Jump
                Debug.Log("<color=orange>[SLAM IMPACT] Tiếp đất chấn động! Bấm Space ngay để Slam Super Jump!</color>");
            }
        }
    }

    void StartSlide(Vector3 moveDir)
    {
        isSliding = true;
        slideDirection = moveDir.magnitude > 0.1f ? moveDir : transform.forward;
        slideDirection.y = 0;
        slideDirection.Normalize();

        currentSlideSpeed = slideStartSpeed;

        transform.localScale = slideScale;
        transform.position -= new Vector3(0, (originalScale.y - slideScale.y) * 0.5f, 0);
    }

    void StopSlide()
    {
        if (!isSliding) return;
        isSliding = false;

        transform.position += new Vector3(0, (originalScale.y - slideScale.y) * 0.5f, 0);
        transform.localScale = originalScale;
    }

    void StartSlam()
    {
        isSlamming = true;
        SetVelocity(new Vector3(0f, -slamSpeed, 0f));
    }
    #endregion

    #region --- XỬ LÝ NHẢY & SLIDE JUMP & SLAM SUPER JUMP ---
    void HandleJump()
    {
        if (Input.GetButtonDown("Jump"))
        {
            // 1. SLAM SUPER JUMP: Nhảy ngay sau khi vừa dậm đất Slam
            if (slamJumpWindow > 0f)
            {
                slamJumpWindow = 0f;
                SetVelocity(new Vector3(GetVelocity().x, 0f, GetVelocity().z));
                rb.AddForce(Vector3.up * slamJumpForce, ForceMode.Impulse);
                Debug.Log("<color=yellow>[SLAM SUPER JUMP] Phóng vút lên trời!</color>");
            }
            // 2. SLIDE JUMP: Nhảy khi đang trượt
            else if (isSliding)
            {
                Vector3 preservedMomentum = slideDirection * currentSlideSpeed;
                StopSlide();

                SetVelocity(new Vector3(preservedMomentum.x, 0f, preservedMomentum.z));
                rb.AddForce(Vector3.up * slideJumpForce, ForceMode.Impulse);
                jumpsRemaining = Mathf.Max(jumpsRemaining - 1, 0);
            }
            // 3. Nhảy thông thường
            else if (jumpsRemaining > 0 && !isDashing && !isSlamming)
            {
                SetVelocity(new Vector3(GetVelocity().x, 0f, GetVelocity().z));
                rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
                jumpsRemaining--;
            }
        }
    }
    #endregion

    #region --- XỬ LÝ BẮN SÚNG (CHUỘT TRÁI) ---
    void HandleShooting()
    {
        fireTimer -= Time.deltaTime;

        if (Input.GetMouseButtonDown(0) && fireTimer <= 0f)
        {
            fireTimer = fireRate;
            Shoot();
        }
    }

    void Shoot()
    {
        // Ưu tiên bắn từ Camera (tâm màn hình) nếu có, hoặc từ thân nhân vật
        Camera cam = Camera.main;
        Vector3 origin = (cam != null) ? cam.transform.position : (transform.position + Vector3.up * 0.5f);
        Vector3 shootDir = (cam != null) ? cam.transform.forward : transform.forward;

        Ray ray = new Ray(origin, shootDir);
        RaycastHit hit;
        Vector3 endPoint = origin + shootDir * gunRange;

        if (Physics.Raycast(ray, out hit, gunRange))
        {
            endPoint = hit.point;

            DummyTarget dummy = hit.collider.GetComponent<DummyTarget>();
            if (dummy != null)
            {
                dummy.TakeDamage(gunDamage, this);
            }
        }

        Debug.DrawLine(origin, endPoint, Color.yellow, 0.15f);
    }
    #endregion

    #region --- HỆ THỐNG MÁU (HEALTH SYSTEM) ---
    public void TakeDamage(float damage)
    {
        if (isDead) return;

        if (isDashing && invulnerableDuringDash)
        {
            Debug.Log("<color=cyan>[DODGE] Né sát thương thành công nhờ Dash!</color>");
            return;
        }

        currentHealth = Mathf.Clamp(currentHealth - damage, 0f, maxHealth);
        Debug.Log($"<color=red>[DAMAGE] Nhận {damage} sát thương. Máu còn: {currentHealth}/{maxHealth}</color>");

        if (currentHealth <= 0)
        {
            Die();
        }
    }

    public void Heal(float amount)
    {
        if (isDead) return;

        currentHealth = Mathf.Clamp(currentHealth + amount, 0f, maxHealth);
        Debug.Log($"<color=green>[HEAL] Hồi {amount} máu. Máu hiện tại: {currentHealth}/{maxHealth}</color>");
    }

    public void HealFromBlood(float amount)
    {
        if (isDead) return;
        Heal(amount);
    }

    private void Die()
    {
        isDead = true;
        Debug.Log("<color=black><b>[GAME OVER] Player đã chết!</b></color>");

        SetVelocity(Vector3.zero);
        if (isSliding) StopSlide();
        isSlamming = false;
    }
    #endregion

    #region --- BỔ TRỢ VẬT LÝ & KIỂM TRA CHẠM ĐẤT ---
    void ApplyBetterFall()
    {
        if (isDashing || isSlamming) return;

        float currentVelocityY = GetVelocity().y;
        if (currentVelocityY < 0)
        {
            rb.AddForce(Vector3.up * Physics.gravity.y * (fallMultiplier - 1f) * Time.deltaTime, ForceMode.VelocityChange);
        }
    }

    bool CheckGrounded()
    {
        float currentExtentsY = (col != null) ? col.bounds.extents.y : (transform.localScale.y * 0.5f);
        float distanceToCheck = currentExtentsY + 0.15f;

        if (groundLayer.value != 0)
        {
            return Physics.Raycast(transform.position, Vector3.down, distanceToCheck, groundLayer, QueryTriggerInteraction.Ignore);
        }
        else
        {
            return Physics.Raycast(transform.position, Vector3.down, distanceToCheck, ~0, QueryTriggerInteraction.Ignore);
        }
    }

    private Vector3 GetVelocity()
    {
#if UNITY_6000_0_OR_NEWER
        return rb.linearVelocity;
#else
        return rb.velocity;
#endif
    }

    private void SetVelocity(Vector3 velocity)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearVelocity = velocity;
#else
        rb.velocity = velocity;
#endif
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = isGrounded ? Color.green : Color.red;
        float currentExtentsY = (GetComponent<Collider>() != null) ? GetComponent<Collider>().bounds.extents.y : (transform.localScale.y * 0.5f);
        Gizmos.DrawLine(transform.position, transform.position + Vector3.down * (currentExtentsY + 0.15f));
    }

    private void OnGUI()
    {
        if (!showDebugUI) return;

        // 1. Vẽ Tâm Ngắm (Crosshair) chính giữa màn hình
        GUI.color = Color.white;
        float centerX = Screen.width / 2f;
        float centerY = Screen.height / 2f;
        GUI.Label(new Rect(centerX - 10, centerY - 10, 20, 20), "+", new GUIStyle { fontSize = 20, normal = { textColor = Color.white }, alignment = TextAnchor.MiddleCenter });

        // 2. Bảng thông số UI góc trái trên
        GUIStyle style = new GUIStyle(GUI.skin.box);
        style.alignment = TextAnchor.UpperLeft;
        style.fontSize = 14;

        GUILayout.BeginArea(new Rect(15, 15, 290, 185), style);
        
        // Hiển thị Máu
        GUI.color = currentHealth > 30f ? Color.green : Color.red;
        GUILayout.Label($"<b>❤️ MÁU (HP):</b> {currentHealth:0} / {maxHealth:0}");

        // Hiển thị Dash Charges (Ultrakill 3 Vạch)
        GUI.color = Color.cyan;
        string dashIcons = new string('|', currentDashCharges).PadRight(maxDashCharges, '.');
        GUILayout.Label($"<b>⚡ DASH (F):</b> [{dashIcons}] ({currentDashCharges}/{maxDashCharges})");

        // Trạng thái hiện tại
        GUI.color = Color.white;
        string state = isDead ? "ĐÃ CHẾT" : 
                       (isDashing ? ">> DASHING <<" : 
                       (isSlamming ? "vv SLAMMING vv" : 
                       (isSliding ? "~~~ SLIDING ~~~" : 
                       (isGrounded ? "MẶT ĐẤT" : "TRÊN KHÔNG"))));
        GUILayout.Label($"<b>Trạng thái:</b> {state}");

        GUI.color = Color.magenta;
        GUILayout.Label("<b>🔫 Chuột trái:</b> Bắn súng (Hút máu cận chiến)");

        if (enableTestKeys && !isDead)
        {
            GUI.color = Color.yellow;
            GUILayout.Label("<i>[K]: Tự trừ 20 HP | [H]: Hồi 20 HP</i>");
        }

        GUILayout.EndArea();
    }
    #endregion
}
