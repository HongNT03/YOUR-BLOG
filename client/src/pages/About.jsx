import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-4">
          About Me
        </h1>

        <div className="flex flex-col items-center">
          <img
            src="https://avatars.githubusercontent.com/u/166291733?v=4"
            alt="Profile"
            className="w-36 h-36 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Tien Hong Nguyen{" "}
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Frontend Developer | Tech Enthusiast
          </p>
        </div>

        <div className="text-gray-700 text-lg space-y-4">
          <p>
            Hello! I'm Nguyen Tien Hong, a passionate software developer with
            experience in frontend development. I specialize in building
            intuitive and responsive web applications using modern technologies
            like React, JavaScript, and Tailwind CSS.
          </p>

          <p>
            In my free time, I enjoy exploring new frameworks and technologies,
            contributing to open-source projects, and keeping up with the latest
            trends in the tech industry. I believe in continuous learning and
            always strive to improve my skills.
          </p>

          <p>
            Feel free to reach out to me if you'd like to collaborate or simply
            chat about tech!
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://linkedin.com/in/hongnt/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/HongNT03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-900"
          >
            GitHub
          </a>
          <a
            href="mailto:nguyentienhong220903@gmail.com"
            className="text-teal-600 hover:text-teal-800"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
