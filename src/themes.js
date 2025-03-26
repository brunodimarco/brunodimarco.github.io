export function getTheme() {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("theme") || "dark";
  }
  return "dark";
}

export function toggleTheme(current) {
  return current === "dark" ? "light" : "dark";
}
