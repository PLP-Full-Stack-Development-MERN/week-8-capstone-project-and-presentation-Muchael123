import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="px-6 md:px-28 lg:px-44 py-12 min-h-[calc(100vh-64px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="lg:text-5xl md:text-3xl text-2xl text-primary font-extrabold leading-tight mb-4">
            Create enchanting stories for children in just minutes.
          </h1>
          <p className="lg:text-2xl text-lg text-primary font-light mb-8">
            Spin joyful stories for young readers quickly, helping them dream big and have fun!
          </p>
          <div>
            <Link to="/create-story">
              <button   className="mt-5 font-bold text-2xl bg-[#5253A3] rounded-md text-white px-8 py-3 transition-all duration-200 hover:scale-x-110">Create story</button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2399825189/display_1500/stock-vector-cute-animals-reading-books-fox-raccoon-and-mouse-studying-cartoon-for-children-education-funny-2399825189.jpg"
              alt="Animals Reading Books"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
              <BookOpen size={32} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Choose Story Yetu?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-3">Quick Creation</h3>
            <p className="text-gray-700">Generate complete, engaging stories for children in minutes with our AI-powered platform.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-3">Educational Value</h3>
            <p className="text-gray-700">Stories that entertain while teaching important life lessons and values to young readers.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-primary mb-3">Customizable</h3>
            <p className="text-gray-700">Tailor stories to specific themes, characters, and settings based on your child's interests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
