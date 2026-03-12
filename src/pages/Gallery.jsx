import { useTheme } from "../context/ThemeContext";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Gallery = () => {
    const { themeColors } = useTheme();
    const mockImages = [
        { id: 1, url: "https://picsum.photos/seed/1/400/300", title: "Project Launch" },
        { id: 2, url: "https://picsum.photos/seed/2/400/300", title: "Team Meeting" },
        { id: 3, url: "https://picsum.photos/seed/3/400/300", title: "Office Space" },
        { id: 4, url: "https://picsum.photos/seed/4/400/300", title: "Client Handover" },
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold" style={{ color: themeColors.text }}>Manage Gallery</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-all">
                    <FaPlus /> Add Image
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockImages.map((img) => (
                    <div key={img.id} className="group relative rounded-2xl overflow-hidden border shadow-sm transition-all hover:shadow-xl" style={{ borderColor: themeColors.border }}>
                        <img src={img.url} alt={img.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                            <p className="text-white font-bold mb-2">{img.title}</p>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full bg-white text-blue-600 hover:scale-110 transition-transform"><FaEdit /></button>
                                <button className="p-2 rounded-full bg-white text-red-600 hover:scale-110 transition-transform"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
