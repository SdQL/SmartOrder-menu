const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/menu/getMenu");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch menu data:", error);
    return [];
  }
};


export { getData };
