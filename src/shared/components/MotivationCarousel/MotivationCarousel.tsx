import { Carousel } from "antd";
import type { CarouselProps } from "antd";

interface SlideContent {
  icon: string; // emoji icon (optional)
  title: string;
  text: string;
  image: string; // image URL or imported asset
}

const slides: SlideContent[] = [
  {
    icon: "💡",
    title: "Break down your goals",
    text: "Big goals feel easier when split into micro-steps. Progress becomes visible.",
    image: "",
  },
  {
    icon: "📊",
    title: "92% of people fail goals",
    text: "But you’ve got a system. You’re not like most. Stay consistent.",
    image: "",
  },
  {
    icon: "🌟",
    title: "A promise to yourself is powerful",
    text: "When you commit publicly or privately — that’s real growth.",
    image: "",
  },
  {
    icon: "💡",
    title: "Update your progress",
    text: "Documenting your journey motivates both you and your followers.",
    image: "",
  },
  {
    icon: "📊",
    title: "43% more success with support",
    text: "People who share progress with others complete their goals faster.",
    image: "",
  },
  {
    icon: "🌟",
    title: "iPromise is more than goals",
    text: "It’s a mindset. A place to build a better version of yourself.",
    image: "",
  },
];

const carouselSettings: CarouselProps = {
  autoplay: true,
  dots: true,
  effect: "scrollx",
};

export const MotivationCarousel = () => {
  return (
    <div className='w-full max-w-[600px] mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden'>
      <Carousel {...carouselSettings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className='p-4 md:p-6'
          >
            <div className='flex flex-col items-center text-center gap-1'>
              <div className='text-2xl md:text-3xl'>{slide.icon}</div>
              <div className='text-base md:text-lg font-medium text-gray-800'>
                {slide.title}
              </div>
              <div className='text-xs md:text-sm text-gray-600 max-w-[400px]'>
                {slide.text}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
