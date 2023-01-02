import { Dispatch, SetStateAction } from 'react';

export interface StyleMenuProps {
  mapStyle: string;
  setMapStyle: Dispatch<SetStateAction<any>>;
}

const mapOptions = [
  {
    key: 'satellite-v9',
    value: 'Satellite',
  },
  {
    key: 'satellite-streets-v12',
    value: 'Satellite (w/ Streets)',
  },
  {
    key: 'dark-v11',
    value: 'Dark',
  },
  {
    key: 'outdoors-v11',
    value: 'Terrain',
  },
];

export const StyleMenu = ({ mapStyle, setMapStyle }: StyleMenuProps) => {
  return (
    <>
      <div className="style-menu">
        <ul>
          {mapOptions.map((opt, i) => {
            return (
              <li key={'map-option-' + i} className={opt.key == mapStyle ? 'active' : ''}>
                <a onClick={() => setMapStyle(opt.key)}>{opt.value}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
