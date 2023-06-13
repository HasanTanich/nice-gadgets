import Tech from "../Tech";
import "./ProductDescription.scss";

type Props = {
  description: [{ title: string; text: string[] }];
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string[];
  screen: string;
};

const ProductDescription = ({
  description,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
  screen,
}: Props) => {
  return (
    <div className="description">
      <div className="description-aboutBox">
        <h3>About</h3>
        <div className="divider descriptionDivider" />
        {description.map((item, index) => (
          <div key={index} className="description-aboutBox-section">
            {description.length > 1 && item && (
              <>
                <h4 className="description-aboutBox-section-title">
                  {item.title}
                </h4>
                {item.text.map((paragraph, index) => (
                  <p
                    key={index}
                    className="description-aboutBox-section-text body-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </>
            )}

            {description.length === 1 && (
              <p
                key={index}
                className="description-aboutBox-section-text body-text"
              >
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="description-techSpecsBox">
        <h3>Tech specs</h3>
        <div className="divider descriptionDivider" />
        <div className="description-techSpecsBox-items body-text">
          <Tech label="Screen" value={screen} />
          <Tech label="Resolution" value={resolution} />
          <Tech label="Processor" value={processor} />
          <Tech label="RAM" value={ram} />
          {capacity && <Tech label="Built in memory" value={capacity} />}
          {camera && <Tech label="Camera" value={camera} />}
          {zoom && <Tech label="Zoom" value={zoom} />}
          {cell.length > 0 && <Tech label="Cell" value={cell.join(", ")} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
