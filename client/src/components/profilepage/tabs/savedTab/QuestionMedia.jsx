import PropTypes from "prop-types";


export default function QuestionMedia ({ media }) {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-3">
      <div className="grid grid-cols-2 gap-2">
        {media.map((item, index) => (
          <div key={index * 0.5} className="relative rounded-lg overflow-hidden">
            {item.type === 'image' && (
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-32 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

QuestionMedia.propTypes = {
  media: PropTypes.array
};


