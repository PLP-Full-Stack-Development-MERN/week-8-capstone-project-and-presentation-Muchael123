import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../context/authStore';

const CreateStory = () => {
  const [formData, setFormData] = useState({
    storySubject: '',
    storyType: null,
    ageGroup: null,
    imageStyle: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (value) delete updatedErrors[field];
      else updatedErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      return updatedErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all fields.');
      return;
    }
    
    setIsLoading(true);
    const loadingToast = toast.loading('Generating your story...');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/stories/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.update(loadingToast, {
          render: data.message || 'Failed to generate story. Check your internet access or your title.',
          type: 'error',
          isLoading: false,
          autoClose: 4000,
        });
        return;
      }

      toast.update(loadingToast, {
        render: 'Story generated successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        render: error.message || 'An error occurred while generating the story. Check your title or internet access!',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#D6D6F5]">
      <h1 className="text-3xl font-bold text-center text-[#333]">CREATE YOUR STORY</h1>
      <p className="text-center text-gray-700 mb-6">Unleash Your Imagination with AI: Weave Captivating Stories Like Never Before!</p>
      
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-semibold">1. What is your story about?</label>
          {errors.storySubject && <p className="text-red-500 text-sm mb-2">{errors.storySubject}</p>}
          <textarea
            value={formData.storySubject}
            onChange={(e) => handleChange('storySubject', e.target.value)}
            placeholder="Write the subject of your story here"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5253A3]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">2. What type of story are you creating?</label>
          {errors.storyType && <p className="text-red-500 text-sm mb-2">{errors.storyType}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Folktale', 'Trickster', 'Heroic', 'Mythology', 'Moral', 'Supernatural'].map((type) => (
              <button
                key={type}
                onClick={() => handleChange('storyType', type)}
                className={`p-4 border rounded-lg ${formData.storyType === type ? 'bg-[#5253A3] text-white' : 'bg-gray-100'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">3. What age group is your story for?</label>
          {errors.ageGroup && <p className="text-red-500 text-sm mb-2">{errors.ageGroup}</p>}
          <div className="grid grid-cols-2 gap-2">
            {['3 - 5 Years', '5 - 7 Years', '8 - 12 Years', '13 - 15 Years'].map((group) => (
              <button
                key={group}
                onClick={() => handleChange('ageGroup', group)}
                className={`p-4 border rounded-lg ${formData.ageGroup === group ? 'bg-[#34A853] text-white' : 'bg-gray-100'}`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">4. What style of image would you like to use?</label>
          {errors.imageStyle && <p className="text-red-500 text-sm mb-2">{errors.imageStyle}</p>}
          <div className="grid grid-cols-2 gap-2">
            {['3D Cartoon', 'Pixel Art', 'Paper Cut', 'Watercolor', 'Flat Illustration', 'Hand-Drawn Sketch'].map((style) => (
              <button
                key={style}
                onClick={() => handleChange('imageStyle', style)}
                className={`p-4 border rounded-lg ${formData.imageStyle === style ? 'bg-[#FF9800] text-white' : 'bg-gray-100'}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 mt-4 justify-center items-center flex bg-[#5253A3] text-white font-semibold rounded-lg hover:bg-[#3b3c8f]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating staory...
            </>
          ) : (
            'Generate Story'
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateStory;