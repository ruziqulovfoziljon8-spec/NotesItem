import React from "react";
import {
  FaBriefcase,
  FaUser,
  FaLightbulb,
  FaPlusCircle,
  FaBookmark,
} from "react-icons/fa";
import { useState } from "react";
import { PiBookBookmark } from "react-icons/pi";
import { BiAlarmExclamation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Add from "../add/Add";
import { useNotes } from "../NotesContext";

interface Category {
  name: string;
  icon: React.JSX.Element;
  path: string;
  color: string;
}

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { notes } = useNotes();

  const categories: Category[] = [
    {
      name: "Barchasi",
      icon: <BiAlarmExclamation />,
      path: "/barchasi",
      color: "#1976d2",
    },
    {
      name: "Ish",
      icon: <FaBriefcase />,
      path: "/ish",
      color: "#1976d2",
    },
    {
      name: "Shaxsiy",
      icon: <FaUser />,
      path: "/shaxsiy",
      color: "#8a1818",
    },
    {
      name: "O'qish",
      icon: <PiBookBookmark />,
      path: "/oqish",
      color: "#ff9800",
    },
    {
      name: "G'oya",
      icon: <FaLightbulb />,
      path: "/goya",
      color: "#4caf50",
    },
  ];

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.name);
    navigate(category.path);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const getNoteCount = (categoryName: string) => {
    if (categoryName === "Barchasi") {
      return notes.length;
    }
    return notes.filter((note) => note.category === categoryName).length;
  };

  return (
    <>
      <div
        style={{
          width: "280px",
          height: "100vh",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          position: "fixed",
          left: 0,
          top: 0,
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: "25px 20px",
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <FaBookmark />
              </div>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#333",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Notes App
                </h2>
              </div>
            </div>

            <button
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#1976d2",
                border: "none",
                color: "white",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1565c0";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1976d2";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={openAddModal}
            >
              <FaPlusCircle />
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "20px 15px",
            flex: 1,
            overflowY: "auto",
          }}
        >
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                margin: "0 0 15px 15px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Kategoriyalar
            </h3>

            <div style={{ marginBottom: "10px" }}>
              {categories.map((category) => {
                const noteCount = getNoteCount(category.name);
                const isActive = activeCategory === category.name;

                return (
                  <div
                    key={category.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 15px",
                      borderRadius: "12px",
                      marginBottom: "6px",
                      backgroundColor: isActive ? "#e3f2fd" : "transparent",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderLeft: isActive
                        ? `4px solid ${category.color}`
                        : "4px solid transparent",
                    }}
                    onClick={() => handleCategoryClick(category)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#f5f7fa";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span
                        style={{
                          color: isActive ? category.color : "#666",
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {category.icon}
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          color: isActive ? "#1976d2" : "#333",
                          fontWeight: isActive ? "600" : "400",
                        }}
                      >
                        {category.name}
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: isActive ? "#1976d2" : "#f0f0f0",
                        color: isActive ? "white" : "#666",
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        minWidth: "28px",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {noteCount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "10px",
              transition: "background-color 0.2s",
              position: "relative",
            }}
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              if (!isProfileMenuOpen) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          ></div>
        </div>
      </div>

      <Add isOpen={isAddModalOpen} onClose={closeAddModal} />
    </>
  );
}
