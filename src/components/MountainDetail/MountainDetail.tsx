// Hopefully this is just temporary, works for now though.
import './MountainDetail.css';

export const MountainDetail = ({ feature }: { feature: any }) => {
  const p = feature.properties;
  return (
    <div className="mountain-detail" id={`popup-${p.id}`}>
      <img src={p.image} />
      <h1>{p.name}</h1>
      <h4>Snow</h4>
      <ul>
        <li>
          <b>New:</b> {p.snowNew}
        </li>
        <li>
          <b>Base:</b> {p.snowBase}
        </li>
        <li>
          <b>Summit:</b> {p.snowSummit}
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
