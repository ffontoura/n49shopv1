export interface Props {
  url: string;
}

export default function Magazine({ url }: Props) {
  return (
    <iframe
      style={{ height: "100vh", marginTop: "-100px" }}
      src={url}
      frameBorder="0"
      width={"100%"}
      height={"100%"}
    >
    </iframe>
  );
}
