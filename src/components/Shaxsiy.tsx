import { useState } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { useNotes } from "../NotesContext";
import NoteItem from "../NoteItem";

export default function Shaxsiy() {
  const { notes, toggleTag, deleteNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");

  const shaxsiyNotes = notes.filter((note) => note.category === "Shaxsiy");
  const filteredNotes = shaxsiyNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "700px",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 2px 15px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            position: "relative",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              padding: "12px 20px",
              border: "1px solid #e0e0e0",
            }}
          >
            <FaSearch
              style={{
                color: "#666",
                marginRight: "10px",
                fontSize: "18px",
              }}
            />
            <input
              type="text"
              placeholder="Shaxsiy eslatmalarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "16px",
                backgroundColor: "transparent",
                color: "#333",
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  padding: "5px",
                  marginLeft: "10px",
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: "2px solid #fce4ec",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                backgroundColor: "#fce4ec",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c2185b",
                fontSize: "22px",
              }}
            >
              <FaUser />
            </div>
            <div>
              <h1
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#c2185b",
                }}
              >
                Shaxsiy
              </h1>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                {searchTerm
                  ? `"${searchTerm}" bo'yicha ${filteredNotes.length} ta natifa topildi`
                  : `Shaxsiy eslatmalar va xotiralar `}
              </p>
            </div>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#999",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
                opacity: 0.5,
              }}
            >
            </div>

          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
              maxHeight: "500px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {filteredNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onToggleTag={toggleTag}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
