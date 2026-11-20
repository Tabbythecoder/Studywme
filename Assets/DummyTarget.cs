using System.Collections;
using UnityEngine;

public class DummyTarget : MonoBehaviour
{
    [Header("--- Thuộc tính Bia tập bắn (Dummy) ---")]
    [Tooltip("Máu tối đa của bia tập bắn")]
    public float maxHealth = 100f;
    public float currentHealth;

    [Tooltip("Khoảng cách tối đa để Player hút máu khi gây sát thương (Cơ chế Blood Is Fuel)")]
    public float bloodHealDistance = 8f;

    [Tooltip("Lượng máu hồi cho Player khi bắn trúng ở cự ly gần")]
    public float bloodHealAmount = 25f;

    private Renderer rend;
    private Color originalColor;

    void Start()
    {
        currentHealth = maxHealth;
        rend = GetComponent<Renderer>();
        if (rend != null)
        {
            originalColor = rend.material.color;
        }
    }

    public void TakeDamage(float damage, PlayerController player = null)
    {
        currentHealth -= damage;
        StopAllCoroutines();
        StartCoroutine(FlashRed());

        // Cơ chế Blood Is Fuel của Ultrakill: Hồi máu khi gây sát thương ở cự ly gần
        if (player != null)
        {
            float dist = Vector3.Distance(transform.position, player.transform.position);
            if (dist <= bloodHealDistance)
            {
                player.HealFromBlood(bloodHealAmount);
                Debug.Log($"<color=magenta>[BLOOD IS FUEL] Hút máu từ kẻ địch ở khoảng cách {dist:0.0}m (+{bloodHealAmount} HP)!</color>");
            }
        }

        if (currentHealth <= 0)
        {
            // Tự động hồi sinh lại bia tập bắn sau khi hết máu
            currentHealth = maxHealth;
            Debug.Log("<color=yellow>[DUMMY] Bia tập bắn đã hồi phục đầy máu!</color>");
        }
    }

    private IEnumerator FlashRed()
    {
        if (rend != null)
        {
            rend.material.color = Color.red;
            yield return new WaitForSeconds(0.12f);
            rend.material.color = originalColor;
        }
    }
}
