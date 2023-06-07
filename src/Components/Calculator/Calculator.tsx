import { useState } from 'react';
import data from '../../data.json';
import './calculator.scss';
import classNames from 'classnames';
import { BestSolution } from '../BestSolution/BestSolution';

export interface Service {
  name: string,
  prices: { year: number, price: number }[],
  packages?: string[],
  content?: string[],
}

export const Calculator = () => {
  const [currentYear, setCurrentYear] = useState(2023);
  const [money, setMoney] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState<string[]>([]);
  const [actions, setActions] = useState<Service[]>([]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setCurrentYear(+value);
    setDisabledButtons([]);
  }

  const handleAddButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement;

    setMoney((prevState) => prevState + +value);

    const serviceName = event.currentTarget.parentElement?.getAttribute('data-service-name');

    const selectedService = data.services.find(service => service.name === serviceName);

    if (selectedService && selectedService.packages && selectedService?.packages.length > 0) {
      const list = data.services
        .filter(service => selectedService.packages
          .includes(service.name));

      setActions(list);
    }

    if (serviceName) {
      setDisabledButtons([...disabledButtons, serviceName]);
    }
  }

  const handleChooseButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement;
    const serviceName = event.currentTarget.parentElement?.getAttribute('data-service-name');

    
    if (serviceName) {
      setDisabledButtons([...disabledButtons, serviceName]);
    }

    const currentPackeg = data.services.find(service => serviceName === service.name);

    const lastAddedContent: string[] = [];

    for (const pack of currentPackeg?.content || []) {
      if (disabledButtons.includes(pack)) {
        lastAddedContent.push(pack);

        setDisabledButtons((prevState) => prevState.filter((button) => button !== pack));
      }
    }

    const filteredServices = data.services.filter(service => lastAddedContent.includes(service.name));

    if (filteredServices.length === 1) {
      const currentPrice = filteredServices[0].prices.find(p => p.year === currentYear)?.price || 0;
      const howMuchToAdd = +value - currentPrice;
      
      setMoney((prevState) => prevState + howMuchToAdd)
    } else if (filteredServices.length === 2) {
      const sumOfPrices = filteredServices.reduce((sum, service) => {
        const servicePrice = service.prices.find(price => price.year === currentYear);
        return sum + (servicePrice ? servicePrice.price : 0);
      }, 0);
      const howMuchToAdd = sumOfPrices - +value;
      
      setMoney((prevState) => prevState - howMuchToAdd)
    }

    setActions([]);
  }

  const handleCanselButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement;

    setMoney((prevState) => {
      if (prevState - +value < 0) {
        return 0;
      }
      return prevState - +value;
    });

    const serviceName = event.currentTarget.parentElement?.getAttribute('data-service-name');

    if (serviceName) {
      const filtered = disabledButtons.filter(button => button !== serviceName);

      setDisabledButtons(filtered);
    }
  }

  const handleCanselChooseButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActions([]);
  }

  const handleCanselButtonAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoney(0);
    setDisabledButtons([]);
  }

  return (
    <div className='calculator'>
      <div className="calculator__choose-year">

        <h1 className='calculator__value-title'>Choose year:</h1>

        <select 
          name="years" 
          className="calculator__years"
          onChange={handleSelect}
          >
          {data.services[0].prices.map((section) => (
            <option key={section.year} value={section.year}>
              {section.year}
            </option>
          ))}
        </select>
      </div>

      {data.services.map((service) => (
        <div
          key={service.name}
          className={classNames(
            'calculator__value',
            {'calculator__value-added': disabledButtons.includes(service.name) },
          )}
        >
          <h1 className='calculator__value-title'>
            {service.name}
          </h1>

          <div
            className="calculator__buttons"
            data-service-name={service.name}
          >
            <h1 className='calculator__value-title'>
              {`${service.prices.find(p => p.year === currentYear)?.price} zl`}
            </h1>
            
            <button
              className={classNames(
                'calculator__value-button',
                { 'calculator__value-button-added': disabledButtons.includes(service.name) },
              )}
              value={service.prices.find(p => p.year === currentYear)?.price}
              onClick={handleAddButton}
              disabled={disabledButtons.includes(service.name)}
            >
              ADD
            </button>

            <button
              className={classNames(
                'calculator__value-button',
                { 'calculator__value-button-added': !disabledButtons.includes(service.name) },
              )}
              value={service.prices.find(p => p.year === currentYear)?.price}
              onClick={handleCanselButton}
              disabled={!disabledButtons.includes(service.name)}
            >
              CANCEL
            </button>
          </div>
          

        </div>
      ))}

      <div className="calculator__sum-field">

        <h1 className='calculator__value-title'>To pay:</h1>

        <h2 className='calculator__value-title'>{`${money} zl`}</h2>

        <button
          className='calculator__value-button'
          onClick={handleCanselButtonAll}
        >
          CANCEL
        </button>
      </div>

      <BestSolution
        actions={actions}
        currentYear={currentYear}
        onChoose={handleChooseButton}
        onCancel={handleCanselChooseButton}
      />
    </div>
  )
};