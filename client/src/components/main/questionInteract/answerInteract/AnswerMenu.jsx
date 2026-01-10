import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, Trash2, Edit, EyeOff, Flag } from "lucide-react";

function AnswerMenu({
  answerId,
  authorId,
  currentUserId,
  onDelete,
  onEdit,
  isDeleting = false
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const isOwner = authorId === currentUserId;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this answer?")) {
      onDelete(answerId);
      setShowMenu(false);
    }
  };

  const handleEdit = () => {
    onEdit(answerId);
    setShowMenu(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        disabled={isDeleting}
      >
        <MoreVertical size={20} className="text-gray-500" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            {isOwner ? (
              <>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Edit size={16} />
                  Edit Answer
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete Answer
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    // Report functionality
                    alert("Report feature coming soon!");
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Flag size={16} />
                  Report Answer
                </button>

                <button
                  onClick={() => {
                    // Hide functionality
                    alert("Hide feature coming soon!");
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <EyeOff size={16} />
                  Hide Answer
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

AnswerMenu.propTypes = {
  answerId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool
};

export default AnswerMenu;