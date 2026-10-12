import { NestJSProgressTracker } from "./components/nestjs-progress-tracker";

export default function NestJSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NestJSProgressTracker>{children}</NestJSProgressTracker>;
}
