# Services Calculator

This is a calculator application that allows users to select a year and choose services they want to purchase from a telecom company. The application calculates the final price of the selected services, taking into account any applicable discounts or package deals.

The data for the services is loaded from an external source (e.g., a JSON file), and the application is designed to be easily customizable and extensible for future updates.

##  Demo:

[DEMO LINK](https://<BozhenaBodnar>.github.io/calculator__app/)

## Features

  -  Select a year: Users can choose a specific year from the available options.
  -  Select services: Users can select the services they wish to purchase from the available options.
  -  Calculate final price: The application calculates the final price of the selected services, including any applicable discounts or package deals.
  -  Dynamic pricing: The prices of services vary depending on the selected year.
  -  Package deals: Users can benefit from package deals that offer discounted prices for combined services.
  -  Dependency handling: Certain services have dependencies, and the application ensures that users cannot add dependent services without selecting the required ones.

## Data Model

The data model for the services includes the following properties:

  -  name: The name of the service.
  -  prices: An array of objects containing the prices for different years.
  -  packages: An optional array of strings representing the package(s) the service belongs to.
  -  content: An optional array of strings representing the dependent service(s) required by this service.

## Technologies Used

  -  React: JavaScript library for building user interfaces.
  -  SaSS: Styling the application components.
  -  JSON: Data source for the services and pricing information.
  -  JSX: Syntax extension for JavaScript used in React components.

## Usage

  -  Select a year from the dropdown menu.
  -  Choose the desired services by clicking the "ADD" button next to each service. If a service is already selected, click the "CANCEL" button to remove it.
  -  The total price of the selected services will be displayed in the "To pay" section.
  -  To reset the selection and start over, click the "CANCEL" button in the "To pay" section.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
