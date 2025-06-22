# Headout Challenges

An addition to [Headout](https://headout.com)'s post-booking flow to include challenges/ popular things to do. Built at Hackin '25.

## How it works

The user submission for the challenges is sent to OpenAI to verify the authenticity of the submission. The user can then share the experience on social media. The user is given credits for their submission which can be used to avail discounts on future bookings thereby increasing the user rention.

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Set up environment variables

   ```bash
   cp .env.example .env
   ```

3. Start the app

   ```bash
   bun run start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Tech Stack

- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/)
- [OpenAI](https://openai.com/)
