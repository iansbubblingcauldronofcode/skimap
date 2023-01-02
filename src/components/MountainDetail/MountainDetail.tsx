// Hopefully this is just temporary, works for now though.
import { cmToIn, mToFt } from '../../utils/utils';
import './MountainDetail.css';

export const MountainDetail = ({ feature }: { feature: any }) => {
  const p = feature.properties;
  return (
    <div className="mountain-detail" id={`popup-${p.id}`}>
      <img src={p.image} />
      <h1>{p.name}</h1>
      <h4>Elevation:</h4>
      <ul>
        <li>
          <b>Summit:</b> {mToFt(p.summit)} ft
        </li>
        <li>
          <b>Vertical:</b> {mToFt(p.vertical)} ft
        </li>
        <li>
          <b>Base:</b> {mToFt(p.base)} ft
        </li>
      </ul>
      <h4>Snow</h4>
      <ul>
        <li>
          <b>New:</b> {cmToIn(p.snowNew)}
        </li>
        <li>
          <b>Base:</b> {cmToIn(p.snowBase)}
        </li>
        <li>
          <b>Summit:</b> {cmToIn(p.snowSummit)}
        </li>
      </ul>
      <h4>Terrain</h4>
      <ul>
        <li>
          <b>Lifts:</b> {p.liftsOpen}
        </li>
        <li>
          <b>Acres Open:</b> {p.acresOpen}
        </li>
        <li>
          <b>Acres Total:</b> {p.acresTotal}
        </li>
      </ul>
      <a className="button" href={p.trailMap} target="_blank">
        View Trail Map
      </a>
    </div>
  );
};
