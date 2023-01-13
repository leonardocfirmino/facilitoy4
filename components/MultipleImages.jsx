import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const MultipleImages = forwardRef((props, ref) => {
  const [images, setImages] = useState([]);
  const input = useRef();
  const [imageURLS, setImageURLs] = useState([]);
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  useImperativeHandle(ref, () => ({
    getImages() {
      return images;
    },
  }));
  return (
    <div ref={ref}>
      <input
        ref={input}
        type="file"
        name="images"
        multiple
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />
      {imageURLS.length > 0 ? (
        <div className="flex gap-4 justify-center items-center min-h-[100px] flex-wrap mt-4 p-3 border-dashed border border-gray-400/70">
          {imageURLS.map((imageSrc, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  setImageURLs(
                    imageURLS.filter((value, indexArr) => indexArr != index)
                  );
                  setImages(
                    images.filter((value, indexArr) => indexArr != index)
                  );
                }}
                type="button"
                className="w-full h-full hidden absolute duration-300 group-hover:flex justify-center items-center z-10 text-red-500 bg-black/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={imageSrc}
                alt="not fount"
                className=" w-32 object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current.click()}
          className="font-bold text-xl w-full h-full min-h-[100px] mt-4  border-dashed border border-gray-400/70 text-gray-400/80"
        >
          Clique aqui para enviar as imagens
        </button>
      )}
    </div>
  );
});

export default MultipleImages;
MultipleImages.displayName = "MultipleImages";
