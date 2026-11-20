using UnityEngine;

public class mouselook : MonoBehaviour
{
    [Header("--- Cài đặt chuột (Mouse Settings) ---")]
    [Tooltip("Độ nhạy của chuột khi quay góc nhìn")]
    public float mouseSensitivity = 250f;

    [Tooltip("Kéo đối tượng Player (thân nhân vật Cube) vào đây")]
    public Transform playerBody;

    [Tooltip("Vị trí mắt so với thân nhân vật (tự bám theo nếu Camera chưa làm con của Player)")]
    public Vector3 eyeOffset = new Vector3(0f, 0.6f, 0f);

    [Header("--- Hiệu ứng Camera (Head Bob & Screen Shake) ---")]
    [Tooltip("Bật hiệu ứng lắc lư nhẹ khi bước đi (Head Bobbing)")]
    public bool enableHeadBob = true;
    public float bobFrequency = 12f;
    public float bobAmount = 0.04f;

    private float xRotation = 0f;
    private float bobTimer = 0f;

    // Rung màn hình (Screen Shake)
    private static float shakeTimeRemaining = 0f;
    private static float currentShakeIntensity = 0.1f;

    public static void TriggerShake(float duration, float intensity)
    {
        shakeTimeRemaining = duration;
        currentShakeIntensity = intensity;
    }

    void Start()
    {
        // 1. Tự động tìm đối tượng Player nếu chưa kéo vào Inspector
        FindPlayer();

        // 2. Khóa chuột ngay khi bắt đầu
        LockCursor();
    }

    void OnApplicationFocus(bool hasFocus)
    {
        // Khi người dùng bấm vào cửa sổ Game (nhận focus), tự động khóa chuột lại
        if (hasFocus)
        {
            LockCursor();
        }
    }

    void Update()
    {
        // Nếu người chơi click chuột trái vào màn hình Game mà chuột chưa khóa -> khóa ngay lập tức!
        if (Input.GetMouseButtonDown(0) && Cursor.lockState != CursorLockMode.Locked)
        {
            LockCursor();
        }

        // Bấm phím Escape (ESC) để tạm thời mở khóa chuột nếu cần thao tác ngoài cửa sổ Game
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (Cursor.lockState == CursorLockMode.Locked)
            {
                UnlockCursor();
            }
            else
            {
                LockCursor();
            }
        }

        // Chỉ xoay góc nhìn khi chuột ĐANG BỊ KHÓA
        if (Cursor.lockState != CursorLockMode.Locked)
        {
            return;
        }

        // 1. Nhận tín hiệu di chuyển chuột
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        // 2. Quay góc nhìn Lên / Xuống (Pitch - xoay quanh trục X của Camera)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -89f, 89f);
        transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);

        // 3. Quay toàn bộ thân nhân vật Sang Trái / Phải (Yaw - xoay quanh trục Y của Player)
        if (playerBody != null)
        {
            playerBody.Rotate(Vector3.up * mouseX);
        }
    }

    void LateUpdate()
    {
        if (playerBody == null)
        {
            FindPlayer();
            if (playerBody == null) return;
        }

        // Vị trí gốc của Camera (tự bám theo đầu Player nếu chưa làm con của Player)
        Vector3 basePosition = (transform.parent == null) ? (playerBody.position + eyeOffset) : eyeOffset;

        // 1. Hiệu ứng lắc lư khi đi bộ (Head Bob)
        Vector3 bobOffset = Vector3.zero;
        if (enableHeadBob)
        {
            float horizontal = Input.GetAxisRaw("Horizontal");
            float vertical = Input.GetAxisRaw("Vertical");
            bool isMoving = (Mathf.Abs(horizontal) > 0.1f || Mathf.Abs(vertical) > 0.1f);

            if (isMoving)
            {
                bobTimer += Time.deltaTime * bobFrequency;
                bobOffset = new Vector3(
                    Mathf.Cos(bobTimer * 0.5f) * bobAmount * 0.5f,
                    Mathf.Sin(bobTimer) * bobAmount,
                    0f
                );
            }
            else
            {
                bobTimer = 0f;
            }
        }

        // 2. Hiệu ứng rung màn hình (Screen Shake)
        Vector3 shakeOffset = Vector3.zero;
        if (shakeTimeRemaining > 0f)
        {
            shakeTimeRemaining -= Time.deltaTime;
            shakeOffset = Random.insideUnitSphere * currentShakeIntensity;
        }

        if (transform.parent == null)
        {
            transform.position = basePosition + bobOffset + shakeOffset;
        }
        else
        {
            transform.localPosition = basePosition + bobOffset + shakeOffset;
        }
    }

    public void LockCursor()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    public void UnlockCursor()
    {
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    private void FindPlayer()
    {
        if (playerBody != null) return;

        PlayerController player = FindAnyObjectByType<PlayerController>();
        if (player != null)
        {
            playerBody = player.transform;
        }
        else if (transform.parent != null)
        {
            playerBody = transform.parent;
        }
    }

    private void OnGUI()
    {
        // Nếu chuột chưa được khóa, hiển thị nhắc nhở người chơi click vào màn hình
        if (Cursor.lockState != CursorLockMode.Locked)
        {
            GUIStyle hintStyle = new GUIStyle(GUI.skin.box);
            hintStyle.fontSize = 16;
            hintStyle.normal.textColor = Color.yellow;
            hintStyle.alignment = TextAnchor.MiddleCenter;

            float width = 360f;
            float height = 45f;
            float x = (Screen.width - width) / 2f;
            float y = Screen.height - 80f;

            GUI.Box(new Rect(x, y, width, height), "🖱️ <b>CLICK CHUỘT VÀO ĐÂY</b> để khóa chuột!", hintStyle);
        }
    }
}
