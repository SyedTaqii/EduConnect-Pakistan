// src/components/wishlist/WishlistCard.jsx
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

const WishlistCard = ({ tutor }) => {
    const { removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className="wishlist-card">
            <img src={tutor.profileImage || "/images/default-tutor.png"} alt="Tutor" />
            <h3>{tutor.name}</h3>
            <p>Subjects: {tutor.subjects.join(", ")}</p>
            <p>Location: {tutor.location}</p>
            <p>Rate: Rs. {tutor.hourlyRate}</p>
            <p>Rating: {tutor.averageRating} ⭐</p>

            <button onClick={() => removeFromWishlist(tutor._id)}>Remove</button>
        </div>
    );
};

export default WishlistCard;
