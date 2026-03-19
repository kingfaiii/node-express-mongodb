import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=500&fit=crop',
      title: 'Summer Collection',
      subtitle: 'Discover the latest trends',
      cta: 'Shop Now',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=500&fit=crop',
      title: 'New Arrivals',
      subtitle: 'Fresh items just in',
      cta: 'Explore',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=500&fit=crop',
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off',
      cta: 'View Deals',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      {/* Carousel Section */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
              <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl mb-8">{slide.subtitle}</p>
              <button className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-lg font-semibold transition">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-light text-white p-2 rounded-full z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-light text-white p-2 rounded-full z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-accent' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <h3 className="text-3xl font-bold text-primary mb-12 text-center">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-muted h-48 flex items-center justify-center">
                <ShoppingCart size={48} className="text-accent" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-primary mb-2">
                  Product {item}
                </h4>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-success fill-success"
                    />
                  ))}
                </div>
                <p className="text-muted text-sm mb-4">High quality product</p>
                <button className="w-full bg-accent hover:bg-success text-white py-2 rounded font-semibold transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
