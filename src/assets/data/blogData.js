// import images from all-images/blog-img directory
import img01 from "../all-images/blog-img/blog-1.jpg";
import img02 from "../all-images/blog-img/blog-2.jpg";
import img03 from "../all-images/blog-img/blog-3.jpg";

const blogData = [
  {
    id: 1,
    title: "The best way to drive cars",
    author: "Nadeesha Silva",
    date: "10 November, 2023",
    time: "9pm",
    imgUrl: img01,
    description:
        "Driving safely and efficiently is essential for your well-being and the long-term health of your vehicle. It all starts with adjusting your seat and mirrors correctly, ensuring you have the best visibility and comfort throughout your journey. Keeping your seat in the right position allows you to maintain better control over the vehicle, while properly set mirrors reduce blind spots, ensuring you're aware of your surroundings at all times.\n" +
        "\n" +
        "Once you're comfortable in the car, always make sure to maintain a safe distance from the vehicles in front of you. This gives you plenty of time to react if anything unexpected happens. Avoiding sudden stops or sharp turns also plays a major role in keeping both you and your car safe. Smooth acceleration and braking not only provide a more comfortable driving experience but also improve fuel efficiency and reduce the wear and tear on your car's brakes, tires, and engine.\n" +
        "\n" +
        "Regular vehicle maintenance is just as important for your safety and the longevity of your car. Checking your tire pressure regularly, monitoring your oil levels, and ensuring that your brakes are in top condition will keep your car running smoothly and help prevent breakdowns. Additionally, make sure your lights, wipers, and other important systems are functioning properly. Keeping your car well-maintained ensures it stays reliable, safe, and efficient for many miles to come.\n" +
        "\n" +
        "Driving with care and responsibility not only ensures your safety but also contributes to the safety of others on the road. A calm, mindful approach to driving leads to a safer and more enjoyable experience for everyone.",

    quote: "Driving with care and responsibility leads to a safer journey for everyone on the road."
  },

  {
    id: 2,
    title: "If your car battery is down",
    author: "Ishara Gune",
    date: "22 February, 2024",
    time: "2pm",
    imgUrl: img02,
    description:
      "A dead car battery is one of the most common issues drivers face, and it can happen at the most inconvenient times. If you find yourself in this situation, the first thing to do is to check for signs like dim headlights, a sluggish engine, or a car that won’t start. If the issue is a completely dead battery, jump-starting the car is usually the quickest solution. You'll need jumper cables and another vehicle with a charged battery to get your car running again.\n" +
        "\n" +
        "If you don’t have jumper cables or another car available, consider using a portable jump starter. This handy device can help start your car without needing assistance from others. After jump-starting, drive around for at least 20 minutes to ensure the alternator has time to charge the battery.\n" +
        "\n" +
        "If your battery repeatedly dies, it's a sign that it might need to be replaced. It's always a good idea to have your battery tested at a professional service center to ensure it's in good condition. Regular maintenance, such as cleaning battery terminals and checking the connections, can also help avoid sudden battery failure.",
    quote:
        "Keep your car battery in check to avoid unexpected breakdowns and stay on the road longer.",
  },

  {
    id: 3,
    title: "The best way to give trip",
    author: "Chanaka Perera",
    date: "5 August, 2021",
    time: "10am",
    imgUrl: img03,
    description:
      "Planning a road trip is an exciting adventure, but preparation is key to making the journey smooth and enjoyable. Start by choosing your destination and mapping out your route. Make sure to research the best roads, scenic spots, and any potential detours along the way. It's important to also consider your vehicle’s condition. Before hitting the road, ensure your car is in top shape by checking the tires, oil levels, brakes, and windshield wipers.\n" +
        "\n" +
        "Next, plan your breaks and overnight stays in advance, especially if you're traveling long distances. Knowing where you can stop for meals, gas, or overnight accommodations will reduce stress along the way. Pack essentials like travel documents, snacks, water, and emergency supplies. Also, make sure to download offline maps or a GPS app in case you lose reception.\n" +
        "\n" +
        "Finally, make sure you have a reliable phone charger, a power bank, and a first-aid kit just in case. A little planning goes a long way in ensuring your road trip is as enjoyable as it is memorable.",
    quote:
      "With the right planning, a road trip can be one of the best experiences you’ll ever have.",
  },
];

export default blogData;
