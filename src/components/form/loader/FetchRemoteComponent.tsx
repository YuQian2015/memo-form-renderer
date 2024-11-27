type FetchRemoteComponentProps = {
  hasError?: boolean
}

export default function (props: FetchRemoteComponentProps) {
  return props.hasError
    ? <div>Loading Error</div>
    : <div>Loading</div>;
}