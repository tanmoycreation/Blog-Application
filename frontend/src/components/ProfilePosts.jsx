import {IF} from '../url'

const ProfilePosts = ({p}) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      {/* left */}
      <div className="w-[43%] h-[200px] flex justify-center items-center bg-gray-800 p-4">
        <img
          src={IF+p.photo}
          alt=""
          className="h-full w-full object-cover rounded-lg shadow-md"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%] p-4 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-2 md:mb-4 md:text-2xl hover:text-gray-300 transition-colors">
         {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-400 items-center justify-between space-x-4 md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
          <p> {new Date(p.updatedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg leading-relaxed text-gray-300">
        {p.desc.slice(0,200)+"...Read more"}
        </p>
      </div>
    </div>
  )
}

export default ProfilePosts
