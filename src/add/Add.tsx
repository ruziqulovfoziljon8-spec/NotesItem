import { FaTimes, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useNotes } from "../NotesContext";

interface AddProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Add({ isOpen, onClose }: AddProps) {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = ["Ish", "Shaxsiy", "O'qish", "G'oya"];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Sarlavha kiritilishi shart!");
      return;
    }

    if (!selectedCategory) {
      alert("Category tanlash shart!");
      return;
    }

    addNote({
      title,
      text,
      category: selectedCategory,
      tags: selectedTags,
      importance: selectedImportance,
    });

    setTitle("");
    setText("");
    setSelectedCategory("");
    setSelectedTags([]);
    setSelectedImportance("");

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  const styles = {
    modalOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContainer: {
      width: "90%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflowY: "auto" as const,
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    },
    modalContent: {
      padding: "30px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#333",
      margin: 0,
    },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: "20px",
      color: "#666",
      cursor: "pointer",
      padding: "5px",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s",
    },
    section: {
      marginBottom: "20px",
      position: "relative" as const,
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#333",
      margin: "0 0 10px 0",
      display: "flex",
      alignItems: "center",
    },
    required: {
      color: "#d32f2f",
      marginLeft: "4px",
    },
    titleInput: {
      width: "100%",
      padding: "12px 15px",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      transition: "border-color 0.2s",
    },
    textArea: {
      width: "100%",
      padding: "15px",
      fontSize: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      fontFamily: "inherit",
      resize: "vertical" as const,
      transition: "border-color 0.2s",
    },
    divider: {
      height: "1px",
      backgroundColor: "#e0e0e0",
      margin: "20px 0",
    },
    dropdownContainer: {
      position: "relative" as const,
      width: "100%",
      marginBottom: "15px",
    },
    dropdownHeader: {
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "border-color 0.2s",
    },
    dropdownSelected: {
      fontSize: "15px",
      color: "#333",
    },
    dropdownIcon: (isOpen: boolean) => ({
      fontSize: "14px",
      color: "#666",
      transition: "transform 0.2s",
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    }),
    dropdownMenu: {
      position: "absolute" as const,
      top: "calc(100% + 5px)",
      left: 0,
      right: 0,
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
      maxHeight: "200px",
      overflowY: "auto" as const,
    },
    dropdownItem: (isSelected: boolean) => ({
      padding: "12px 15px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      borderBottom: "1px solid #f0f0f0",
      backgroundColor: isSelected ? "#e3f2fd" : "white",
      color: isSelected ? "#1976d2" : "#333",
      fontWeight: isSelected ? 600 : 400,
    }),
    tagItem: (isSelected: boolean) => ({
      padding: "12px 15px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      borderBottom: "1px solid #f0f0f0",
      backgroundColor: isSelected ? "#e8f5e9" : "white",
      color: isSelected ? "#2e7d32" : "#333",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    selectedTags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "10px",
    },
    selectedTag: {
      backgroundColor: "#1976d2",
      color: "white",
      padding: "4px 10px",
      borderRadius: "15px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    buttonSection: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "15px",
      paddingTop: "20px",
    },
    cancelBtn: {
      padding: "12px 30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fff",
      color: "#666",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    saveBtn: {
      padding: "12px 30px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#1976d2",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalContent}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Yangi qayd</h1>
            <button
              style={styles.closeBtn}
              onClick={onClose}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FaTimes />
            </button>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Sarlavha <span style={styles.required}>*</span>
            </h2>
            <input
              type="text"
              style={styles.titleInput}
              placeholder="Kod optimizatsiyasi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Asosiy matn</h2>
            <textarea
              style={styles.textArea}
              placeholder="Kodni optimallashtirishga oid maslahatlar..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>

          <div style={styles.divider}></div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Category <span style={styles.required}>*</span>
            </h2>
            <div style={styles.dropdownContainer}>
              <div
                style={styles.dropdownHeader}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#bbb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#ddd")
                }
              >
                <span style={styles.dropdownSelected}>
                  {selectedCategory || "Category tanlang"}
                </span>
                <FaChevronDown style={styles.dropdownIcon(isCategoryOpen)} />
              </div>

              {isCategoryOpen && (
                <div style={styles.dropdownMenu}>
                  {categories.map((category) => (
                    <div
                      key={category}
                      style={styles.dropdownItem(selectedCategory === category)}
                      onClick={() => handleCategorySelect(category)}
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category) {
                          e.currentTarget.style.backgroundColor = "#f5f5f5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category) {
                          e.currentTarget.style.backgroundColor = "white";
                        }
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.buttonSection}>
            <button
              style={styles.cancelBtn}
              onClick={handleCancel}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9f9f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              Bekor qilish
            </button>
            <button
              style={styles.saveBtn}
              onClick={handleSave}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1565c0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1976d2")
              }
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
