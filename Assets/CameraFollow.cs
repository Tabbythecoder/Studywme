using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    [Tooltip("Kéo đối tượng Player (hoặc Cube) vào đây")]
    public Transform target;

    [Tooltip("Khoảng cách lệch tương đối giữa Camera và nhân vật")]
    public Vector3 offset = new Vector3(0f, 5f, -8f);

    [Tooltip("Độ mượt khi Camera bám theo nhân vật")]
    [Range(0.01f, 1f)]
    public float smoothSpeed = 0.125f;

    void LateUpdate()
    {
        if (target == null) return;

        // Vị trí mong muốn của Camera
        Vector3 desiredPosition = target.position + offset;

        // Di chuyển mượt mà đến vị trí mong muốn
        Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed);
        transform.position = smoothedPosition;

        // Luôn hướng Camera nhìn về phía nhân vật
        transform.LookAt(target);
    }
}
