const StarRating = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5]; // Puedes ajustar la cantidad de estrellas según tus necesidades

    return (
        <div>
            {stars.map(star => (
                <span
                    key={star}
                    onClick={() => onChange(star)}
                    style={{ cursor: 'pointer', color: star <= value ? 'gold' : 'gray' }}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;