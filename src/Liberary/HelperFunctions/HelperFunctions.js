import avatar from "../../assets/app_photos/pexels-jeffreyreed-769772.jpg"
export function formatPostDate(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();

    const diffMs = now - postDate; // الفرق بالملي ثانية
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // لو نفس اليوم
    if (
        now.getFullYear() === postDate.getFullYear() &&
        now.getMonth() === postDate.getMonth() &&
        now.getDate() === postDate.getDate()
    ) {
        return postDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        });
    }

    // لو من أيام
    if (diffDays >= 1) {
        return `${diffDays}d`;
    }

    // لو من ساعات
    if (diffHours >= 1) {
        return `${diffHours}h`;
    }

    // لو من دقائق
    if (diffMinutes >= 1) {
        return `${diffMinutes}m`;
    }

    return "Just now";
}
export function defualtAvatar(photo){
    return photo && photo.includes("undefined") ? avatar : photo
}