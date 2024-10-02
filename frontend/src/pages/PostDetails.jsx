import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { URL, IF } from "../url";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/Themcontex";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext); // Get the theme
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"}`}>
      <Navbar />
      <div className="px-8 md:px-[200px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold md:text-3xl">
            {post.title}
          </h1>
          {user?._id === post?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)}>
                <BiEdit />
              </p>
              <p className="cursor-pointer" onClick={handleDeletePost}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex items-center justify-center space-x-2">
            <p>{new Date(post.updatedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
          </div>
        </div>
        <img
          src={IF + post.photo}
          className="w-full h-auto max-w-[600px] mx-auto mt-8 rounded-lg shadow-lg"
        />
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c, i) => (
              <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {comments?.map((c) => (
            <Comment key={c._id} c={c} />
          ))}
        </div>
        {/* Write a comment */}
        <div className="flex flex-col mt-4 md:flex-row">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className={`md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 md:mr-2 ${theme === "light" ? "bg-white" : "bg-gray-700 text-white"}`}
          />
          <button
            onClick={postComment}
            className="bg-black text-sm text-white px-2 py-2 md:w-[10%] mt-4 md:mt-0"
          >
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
