// Hopefully this is just temporary, works for now though.

export const MountainDetail = ({ feature }: { feature: any }) => {
  const { id, name, description } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  );
};
