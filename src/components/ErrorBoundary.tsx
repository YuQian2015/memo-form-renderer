import clsx from "clsx";
import { Component, MouseEvent, ReactNode } from "react";
import { TbChecks, TbCopy, TbX } from "react-icons/tb";

import { Button } from "@/components/ui/button";


interface ErrorBoundaryProps {
  fallback?: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  showMore: boolean
  error: any
  isCopy: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false, error: "" as any, isCopy: false, showMore: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  // componentDidCatch(error: any, info: any) {
  //   console.log(error, info);
  // }

  handleCopy = (e: MouseEvent<HTMLDivElement>, d: string) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isCopy: true });
    window.AIM.copyText(d);
    setTimeout(() => {
      this.setState({ isCopy: false });
    }, 2000);
  };

  render() {
    const { hasError, showMore, isCopy } = this.state;
    const { children } = this.props;

    return hasError ? <>
      <div className='text-white-500 fixed rounded-md shadow-md min-w-[300px] max-w-xl z-50 top-12 break-all bg-red-500/80 p-2 pr-10 left-1/2 -translate-x-1/2'>
        <Button onClick={() => this.setState({ hasError: false })} size={"icon"} variant={"link"} className='absolute right-1 top-1 text-black'>
          <TbX size={16} />
        </Button>
        <div>{this.props.fallback + this.state.error}</div>
        {
          this.state.error?.stack &&
          <>
            {
              showMore && <code className='text-xs text-white-500 break-all font-mono p-2'>
                <div className="overflow-hidden bg-background text-foreground p-2">{this.state.error.stack}</div>
              </code>
            }
            <div>
              <Button
                className="float-right"
                size={"sm"}
                variant={"destructive"}
                onClick={() => this.setState({ showMore: !this.state.showMore })}>
                {showMore ? "Show less" : "Show more"}
              </Button>
              <Button
                size={"icon"}
                variant={"destructive"}
                onClick={(e) => this.handleCopy(e, this.state.error.stack)}
                className={clsx(["flex items-center gap-1 text-xs float-right w-8 h-8 mr-2", isCopy && "text-green-500"])}>
                {
                  isCopy ? <TbChecks size={16} className="shrink-0" /> : <TbCopy size={16} className="shrink-0" />
                }
              </Button>
            </div>
          </>
        }
      </div>
    </> : children;
  }
}

export default ErrorBoundary;