import logoAsset from "@/assets/logo-frulcars-2.jpg.asset.json";

export const FrulCarsLogo3D = ({ hovered, logoUrl, alt = "FRUL'CARS" }: { hovered: boolean; logoUrl?: string; alt?: string }) => {
  const src = logoUrl ?? logoAsset.url;
  return (
    <div className="logo-3d-scene" aria-label="Logo FRUL'CARS en rotation 3D">
      <div className={`logo-3d-inner${hovered ? " logo-3d-inner--active" : ""}`}>
        <div className="logo-face logo-face--front">
          <img src={src} alt={alt} loading="lazy" />
        </div>
        <div className="logo-face logo-face--back">
          <img src={src} alt="" aria-hidden="true" loading="lazy" />
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
