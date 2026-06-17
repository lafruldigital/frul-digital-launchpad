import logoAsset from "@/assets/nouveau-logo-frulcars.png.asset.json";

export const FrulCarsLogo3D = ({ hovered }: { hovered: boolean }) => {
  return (
    <div className="logo-3d-scene" aria-label="Logo FRUL'CARS en rotation 3D">
      <div className={`logo-3d-inner${hovered ? " logo-3d-inner--active" : ""}`}>
        <div className="logo-face logo-face--front">
          <img src={logoAsset.url} alt="FRUL'CARS" loading="lazy" />
        </div>
        <div className="logo-face logo-face--back">
          <img src={logoAsset.url} alt="" aria-hidden="true" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

function FallbackImage() {
  return (
    <img
      src={logoAsset.url}
      alt="FRUL'CARS"
      className="w-2/3 h-2/3 object-contain object-center mx-auto"
    />
  );
}

export { FallbackImage as FrulCarsLogoFallback };
