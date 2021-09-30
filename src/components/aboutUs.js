import "../assets/css/aboutUs.css";

const AboutUs = () => {
  return (
    <div className="page mb-3">
      <div className="my-4 mx-5">
        <h1>About Us</h1>
        <p>
          In this day and age, life is understandably hectic for many pet
          parents. With commitments at work, time out with friends and family,
          full time attention to our pets are usually not a possibility. So
          whether you are having late nights at work, out on a holiday or simply
          need a break and need pet sitting, in home boarding, daycare, dog
          walking or even pet grooming, PeTi's is here to connect you with other
          pet lovers who are ready to help you take care of your pets like it
          were part of their family, belly rubs and hugs included.
        </p>

        <div>
          <img
            className="w-100"
            style={{ height: "500px" }}
            src="https://www.townadvisor.com/wp-content/uploads/2017/03/various-pets.jpg"
            alt="https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/petvariety_0.png?itok=Ef45NCrW"
          />
        </div>

        <div className="mt-5">
          <p>
            PeTi's sitters and pet service providers are normal people who love
            pets, just like you. They are pet people who are dedicated to put
            time into giving your pet a day worth barking or meowing about, even
            roaring about if you’ve got that sort of pet. Your pet stays in a
            home, free to roam and explore, rather than in the confines of a 3
            foot cage typical in kennels or pet hotels. You wouldn’t want to be
            locked in a cage when your other half is away! PeTi's sitters also
            limit the number of pets that they take in at any one time, giving
            your pet much deserved attention while you are away. Compare that to
            rows and rows of pets trying to seek attention from just a few
            attendants in a kennel or pet shop. Some of our sitters even go to
            great lengths, giving your pets’ treats or home spas and delicious
            home cooked food.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
