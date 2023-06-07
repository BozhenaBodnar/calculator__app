import React from 'react';
import './bestSolution.scss';
import classNames from 'classnames';
import { Service } from '../Calculator/Calculator';

type Props = {
  actions: Service[],
  currentYear: number,
  onChoose: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const BestSolution: React.FC<Props> = ({
  actions,
  currentYear,
  onChoose,
  onCancel,
}) => {
  return (
    <div className={classNames(
      "best-solution",
      {"best-solution-none": actions.length === 0 },
    )}>
      <div className="best-solution__container">
        
        <p>You can buy:</p>

        {actions.map(action => (
          <div 
            className="best-solution__value"
          >
            <p>{action.name}</p>

            <div
              className="best-solution__right-container"
              data-service-name={action.name}
            >
              <p>
                {`${action.prices.find(p => p.year === currentYear)?.price} zl`}
              </p>

              <button
                className='best-solution__button'
                value={action.prices.find(p => p.year === currentYear)?.price}
                onClick={onChoose}
                >
                CHOOSE
              </button>
            </div>
          </div>
        ))}

        <button
          className='best-solution__button best-solution__button-cancel'
          onClick={onCancel}
          >
          CANCEL
        </button>
      </div>
    </div>
  )
}