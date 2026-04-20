import { FaCheck, FaTimes, FaTag } from "react-icons/fa";

interface NoteItemProps {
  note: {
    id: string;
    title: string;
    text: string;
    category: string;
    tags: string[];
    importance: string;
    date: string;
  };
  onToggleTag: (noteId: string, tag: string) => void;
  onDelete: (id: string) => void;
}

export default function NoteItem({
  note,
  onToggleTag,
  onDelete,
}: NoteItemProps) {
  const categoryColors = {

  };

  const tagColors: Record<string, string> = {

  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderLeft: `4px solid ${
          categoryColors[note.category as keyof typeof categoryColors] || "#ccc"
        }`,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            {note.title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "5px",
            }}
          >
          </div>
        </div>

        <button
          onClick={() => onDelete(note.id)}
          style={{
            background: "none",
            border: "none",
            color: "#999",
            cursor: "pointer",
            padding: "5px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f0f0f0";
            e.currentTarget.style.color = "#d32f2f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#999";
          }}
        >
          <FaTimes size={14} />
        </button>
      </div>

      <p
        style={{
          margin: "10px 0",
          fontSize: "14px",
          color: "#666",
          lineHeight: 1.5,
          minHeight: "60px",
        }}
      >
        {note.text}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "15px",
        }}
      >
        {note.tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => onToggleTag(note.id, tag)}
            style={{
              backgroundColor: tagColors[tag] || "#f0f0f0",
              border: "none",
              borderRadius: "20px",
              padding: "6px 12px",
              fontSize: "12px",
              color: tagColors[tag] ? "white" : "#333",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!tagColors[tag]) {
                e.currentTarget.style.backgroundColor = "#e0e0e0";
              } else {
                e.currentTarget.style.opacity = "0.9";
              }
            }}
            onMouseLeave={(e) => {
              if (!tagColors[tag]) {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
              } else {
                e.currentTarget.style.opacity = "1";
              }
            }}
          >
            <FaTag size={10} />
            {note.tags.includes(tag) && <FaCheck size={10} />}
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
