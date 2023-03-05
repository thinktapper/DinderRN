<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/thinktapper/dinder">
    <img src="https://user-images.githubusercontent.com/10656909/192128259-0755450e-6e1d-40e8-be0b-0769908d3526.svg" alt="Logo" width="320" height="">
  </a>

<h3 align="center">Swipe. Match. Eat.</h3>

<p align="center">
    Going out to eat with friends is a great way to catch up and enjoy each other's company. But it can be a hassle to find a place that everyone likes. Dinder helps you find a place that everyone agrees on.
    <br />
    <a href="#readme-toc"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/thinktapper/DinderRN">View Demo</a>
    ·
    <a href="https://github.com/thinktapper/DinderRN/issues">Report Bug</a>
    ·
    <a href="https://github.com/thinktapper/DinderRN/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details name="readme-toc">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#why-its-made">Why It's Made</a></li>
    <li><a href="#how-its-made">How It's Made</a></li>
    <li>
      <a href="#lessons-learned">Lessons Learned</a>
      <ul>
        <li><a href="#key-takeaways">Key Takeaways</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<h2>About The Project</h2>

<p>Like Tinder for food, Dinder uses swipe matching to decide on the perfect place for your next meal. Users are able to create accounts and log in, set profile information and location details, and swipe through a deck of restaurants tailored to their occasion. Each card in the deck contains real-time establishment data sourced from Google Maps and stored alongside user votes on the backend, <a href="https://github.com/thinktapper/DinderIsServed">Dinder Is Served</a>.</p>

<div align="center">

https://user-images.githubusercontent.com/10656909/221169812-5140ddaf-8d9b-4bad-ab52-b0d3382db2e8.mp4

### Screenshots

<details>
  <summary>Show Images</summary>
    <img src='https://user-images.githubusercontent.com/10656909/222942913-bb4eef89-61e1-424b-b26d-7e4a1f5f2554.png' alt='' width='128'>
    <img src='https://user-images.githubusercontent.com/10656909/222942889-336a796b-3730-4530-bcdf-f55a920c057b.png' alt='' width='128'>
    <img src='https://user-images.githubusercontent.com/10656909/222942931-42860e6b-625a-4ebf-a432-b61f3d37ad01.png' alt='' width='128'>
    <img src='https://user-images.githubusercontent.com/10656909/222942957-b218210d-428b-4147-bbe6-70de11c16c10.png' alt='' width='128'>
    <img src='https://user-images.githubusercontent.com/10656909/222942962-73635777-2d89-4cad-aae7-41b3d4bbe25b.png' alt='' width='128'>
    <img src='https://user-images.githubusercontent.com/10656909/222942965-4bf6c1e5-a7ec-4f5f-ac0d-3d55cc06b60d.png' alt='' width='128'>
</details>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Expo][expo]][expo-url]
- [![GoogleMaps][googlemaps]][googlemaps-url]
- [![tailwindcss][tailwindcss]][tailwindcss-url]
- [![React Query][react-query]][react-query-url]
<!-- - [![React Native][react-native]][react-native-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You’ll need to have modern versions of node.js (LTS ^16.18 recommend) and yarn or npm installed.

### Installation

- Install packages with `yarn` or `npx expo install`.
- Copy environment variables so you can safely add secrets if necessary:
  - `cp .env.example .env`
- Run `yarn start` or `npx expo start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS → `yarn ios` or `npx expo run:ios`
  - Android → `yarn android` or `npx expo run:android`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Why It’s Made

Dinder is a passion project that solves a problem that many can relate to. I enjoy building fun, engaging things that add value to people’s lives. The idea driving Dinder fits this bill and is an excellent excuse to learn and play with new & exciting technologies. I initially started building [the app](https://github.com/thinktapper/dinder) for the browser, leveraging Next.js as a React framework and serverless API. However, I knew its true user experience was destined for mobile phones. This codebase is now a viable user-facing client for Dinder’s new life as a native app on iOS, Android— and eventually web-based platforms.

## How It's Made

This project was made using React Native and Expo. I used TailwindCSS for styling and Tanstack Query (React Query) for handling data communications with the backend, [Dinder Is Served](https://github.com/thinktapper/DinderIsServed). The Google Maps Places API was used to autocomplete feast locations & get detailed restaurant data.

<details name="why-expo">
<summary><i>Why Expo vs. plain React Native?</i></summary>
<ul>
    <li> For many reasons, but mostly: <strong>Time</strong></li>
    <li>Expo takes care of a lot of the tedious aspects of RN development - e.g. pod installs, adjusting native iOS & Android code for specific packages</li>
    <li>Allowing me to strategically focus on building features</li>
    <li>Eventually, I would like to implement the web compiler for this project as well</li>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Lessons Learned:

This full-stack project was a great way to learn about React/React Native for the frontend and building a Node + Express API server in TypeScript for the [backend](https://github.com/thinktapper/DinderIsServed). I learned how to use react-query to keep client/server data in sync, and even for global state management. I also learned how to use the Google Maps Places API to autocomplete location searches, and how to use Tailwind utility classes in a React Native mobile app.

### Key Takeaways:

<ul>
  <li>Dinder offered an opportunity to learn about developing mobile applications using Expo and React Native.</li>
  <li>Practiced full-stack development to gain a deeper understanding of how the frontend and backend components interact with each other.</li>
  <li>Built a custom REST API server for the backend in order to meet business logic requirements.</li>
  <li>Strengthend my understanding of the overall architecture of modern JS applications.</li>
  <li>Practiced working with third-party APIs on both the client and server-side by making requests, parsing responses, and handling errors.</li>
  <li>Learned how to use Tanstack/React Query as to optimize data fetching, caching, and synchronization.</li>
  <li>The project also taught me how to create context providers to share authentication information across multiple components.</li>
  <li>Learned how to use Tailwind utility classes in a React Native mobile app.</li>
  <li>The project provided opportunities to practice my debugging skills by identifying and fixing bugs in both the frontend and backend.</li>
  <li>Learned how to deploy code to multiple environments, such as development, staging, and production.</li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

With time, I plan to add the following features:

- [x] Add a "Winner" screen to display winning restuarant after voting closes.
- [x] Implement list of other users/friends to optionally add to new feasts.
- [x] Switch remaining touchableOpacities to pressables
- [ ] Implement 'react-native-fast-image’ to replace RN’s Image component (even FB doesn’t use)
- [ ] Restyle homescreen for when no feast is selected to instruct the user to choose or create a new one
- [ ] Add tooltip if user presses disabled button when current feast is not closed
- [ ] Feastscreen: add error if editing or deleting a feast they don't own (status code 401)
- [ ] Save image for feast location and display it in the feasts list
- [ ] Use 'flashlist' instead of flatlist for better performance
- [ ] Add a feature so users can filter restaurants by various criteria
  - [ ] Add options for that criteria in the feast creation form & persist in the database
- [ ] Add a feature so users can save their favorite restaurants
- [ ] Add automatic dark mode support
- [ ] Use 'react-native-haptic-feedback' to add a vibration effects
- [ ] Refactor the code to use TypeScript for better type safety
- [ ] Add Detox E2E testing
- [ ] Add more detailed documentation

See the [open issues](https://github.com/thinktapper/DinderRN/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

[![MadeByTapper][madeby-tapper]][madeby-tapper-url] [![LinkedIn][linkedin-shield]][linkedin-url]

Andrew Tapper - [@thinktapper](https://twitter.com/thinktapper) - andrew@tapper.codes

Backend | REST API Server: [https://github.com/thinktapper/DinderIsServed](https://github.com/thinktapper/DinderIsServed)

Parent Project: [https://github.com/thinktapper/dinder](https://github.com/thinktapper/dinder)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

[![GNU License][license-shield]][license-url]

Distributed under the GNU GPLv3. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<!-- ## Acknowledgments

- []()
- []()
- []() -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/thinktapper/DinderRN.svg?style=for-the-badge
[contributors-url]: https://github.com/thinktapper/DinderRN/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/thinktapper/DinderRN.svg?style=for-the-badge
[forks-url]: https://github.com/thinktapper/DinderRN/network/members
[stars-shield]: https://img.shields.io/github/stars/thinktapper/DinderRN.svg?style=for-the-badge
[stars-url]: https://github.com/thinktapper/DinderRN/stargazers
[issues-shield]: https://img.shields.io/github/issues/thinktapper/DinderRN.svg?style=for-the-badge
[issues-url]: https://github.com/thinktapper/DinderRN/issues
[license-shield]: https://img.shields.io/github/license/thinktapper/DinderRN?style=for-the-badge
[license-url]: https://github.com/thinktapper/DinderRN/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/thinktapper
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://beta.nextjs.org/
[expo]: https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white
[expo-url]: https://expo.dev/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[react-query]: https://img.shields.io/badge/React-Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=FF4154
[react-query-url]: https://tanstack.com/query/
[react-native]: https://img.shields.io/badge/React-Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-native-url]: https://reactnative.dev/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[tailwindcss]: https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[tailwindcss-url]: https://tailwindcss.com
[supabase]: https://img.shields.io/badge/supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=black
[supabase-url]: https://app.supabase.com/
[googlemaps]: https://img.shields.io/badge/googlemaps-red?style=for-the-badge&logo=googlemaps&logoColor=white
[googlemaps-url]: https://developers.google.com/maps
[prisma]: https://img.shields.io/badge/prisma-35495E?style=for-the-badge&logo=prisma&logoColor=4FC08D
[prisma-url]: https://prisma.io
[postgresql]: https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://postgresql.org/
[typescript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[madewith-typescript]: https://img.shields.io/badge/made%20with-typescript-blue?style=for-the-badge
[madewith-typescript-url]: https://www.typescriptlang.org/
[madewith-love]: https://img.shields.io/badge/made%20with-%E2%9D%A4-red?style=for-the-badge
[madewith-love-url]: https://tapper.codes
[madeby-tapper]: https://img.shields.io/badge/made%20by-tapper-blue?style=for-the-badge
[madeby-tapper-url]: https://tapper.codes
