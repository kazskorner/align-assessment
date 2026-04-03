export const metadata = {
  title: 'ALIGN Retirement Assessment',
  description: 'Personalized retirement strategy quiz',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
