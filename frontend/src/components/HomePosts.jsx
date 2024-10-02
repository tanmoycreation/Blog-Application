import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Left Section - Image */}
      <div className="w-[25%] h-[200px] flex justify-center items-center bg-gray-700 p-4">
        <img
          src={IF + post.photo}
          alt={post.title}
          className="h-full w-full object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Right Section - Content */}
      <div className="flex flex-col w-[70%] p-4">
        <h1 className="text-xl font-bold mb-2 md:mb-4 md:text-2xl hover:text-indigo-300 transition-colors">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-400 items-center justify-between md:mb-4">
          <p className="bg-indigo-500 px-2 py-1 rounded-full text-white">{`@${post.username}`}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg leading-relaxed text-gray-300 mb-4">
          {post.desc.slice(0, 200)}{" "}
          <strong className="text-indigo-400 cursor-pointer">...Read more</strong>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
