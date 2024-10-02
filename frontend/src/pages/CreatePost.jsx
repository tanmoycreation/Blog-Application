import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/Themcontex';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Access theme from context

    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i, 1);
        setCats(updatedCats);
    };

    const addCategory = () => {
        if (cat) {
            let updatedCats = [...cats, cat];
            setCat("");
            setCats(updatedCats);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;

            try {
                await axios.post(URL + "/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
            navigate("/posts/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-blue-100 to-purple-100" : "bg-gradient-to-br from-gray-800 to-gray-900"}`}>
            <Navbar />
            <div className={`px-6 md:px-[200px] mt-8 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                <h1 className={`font-bold md:text-3xl text-2xl text-center mb-6 ${theme === "light" ? "text-blue-700" : "text-blue-300"}`}>
                    Create a New Post
                </h1>
                <form className={`w-full ${theme === "light" ? "bg-white" : "bg-gray-700"} p-6 rounded-lg shadow-md flex flex-col space-y-6`}>
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        placeholder='Enter post title' 
                        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${theme === "light" ? "text-black" : "bg-gray-800 text-white"}`}
                    />
                    <input 
                        onChange={(e) => setFile(e.target.files[0])} 
                        type="file"  
                        className={`px-4 border border-gray-300 rounded-md py-2 transition duration-150 ${theme === "light" ? "bg-white" : "bg-gray-600 text-white"}`}
                    />
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4'>
                            <input 
                                value={cat} 
                                onChange={(e) => setCat(e.target.value)} 
                                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${theme === "light" ? "text-black" : "bg-gray-800 text-white"}`} 
                                placeholder='Enter post category' 
                                type="text" 
                            />
                            <div 
                                onClick={addCategory} 
                                className='bg-blue-500 text-white px-4 py-2 font-semibold rounded-md cursor-pointer hover:bg-blue-600 transition duration-150'
                            >
                                Add
                            </div>
                        </div>
                        <div className='flex px-4 mt-3 flex-wrap'>
                            {cats.map((c, i) => (
                                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-3 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <p onClick={() => deleteCategory(i)} className='text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm'>
                                        <ImCross />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea 
                        onChange={(e) => setDesc(e.target.value)} 
                        rows={10} 
                        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${theme === "light" ? "text-black" : "bg-gray-800 text-white"}`} 
                        placeholder='Enter post description'
                    />
                    <button 
                        onClick={handleCreate} 
                        className='bg-blue-500 w-full md:w-[10%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md hover:bg-blue-600 transition duration-150'
                    >
                        Create Post
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreatePost;
