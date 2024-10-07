
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, CartesianGrid, XAxis, Line, BarChart, YAxis, Bar, PieChart, Pie } from "recharts"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

const Admindashboard = () => {
    const clientsData = 1234
  const reservationsByClient = [
    { client: "John Doe", reservations: 25 },
    { client: "Jane Smith", reservations: 18 },
    { client: "Michael Johnson", reservations: 12 },
    { client: "Emily Davis", reservations: 9 },
    { client: "David Wilson", reservations: 7 },
  ]
  const mostRentedCars = [
    { car: "Toyota Camry", rentals: 150 },
    { car: "Honda Civic", rentals: 120 },
    { car: "Ford F-150", rentals: 100 },
    { car: "Nissan Altima", rentals: 90 },
    { car: "Chevrolet Silverado", rentals: 80 },
  ]
  const reservationTrends = [
    { month: "Jan", desktop: 100, mobile: 50 },
    { month: "Feb", desktop: 120, mobile: 60 },
    { month: "Mar", desktop: 150, mobile: 70 },
    { month: "Apr", desktop: 180, mobile: 80 },
    { month: "May", desktop: 200, mobile: 90 },
    { month: "Jun", desktop: 220, mobile: 100 },
  ]
  const topRentedCarModels = [
    { model: "Toyota Camry", rentals: 150 },
    { model: "Honda Civic", rentals: 120 },
    { model: "Ford F-150", rentals: 100 },
    { model: "Nissan Altima", rentals: 90 },
    { model: "Chevrolet Silverado", rentals: 80 },
  ]
  const reservationStatusBreakdown = [
    { status: "Pending", value: 30 },
    { status: "Confirmed", value: 50 },
    { status: "Cancelled", value: 20 },
  ]
  return (
    <div>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4  px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="#" >
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>       
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px          -6 sm:py-0 md:gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{clientsData}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reservations by Client</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {reservationsByClient.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item.client}</span>
                    <span>{item.reservations}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Most Rented Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {mostRentedCars.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item.car}</span>
                    <span>{item.rentals}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reservation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
                  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
                }}
                className="min-h-[100px]"
              >
                <LineChart accessibilityLayer data={reservationTrends} margin={{ top: 25,left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                  <Line dataKey="mobile" type="natural" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Rented Car Models</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ desktop: { label: "Rentals", color: "hsl(var(--chart-1))" } }}
                className="min-h-[100px]"
              >
                <BarChart accessibilityLayer data={topRentedCarModels} layout="vertical" margin={{ top: 25,left: -20 }}>
                  <YAxis dataKey="model" type="category" tickLine={false} tickMargin={10} axisLine={false} />
                  <XAxis type="number" dataKey="rentals" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="rentals" fill="var(--color-desktop)" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reservation Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  pending: { label: "Pending", color: "hsl(var(--chart-1))" },
                  confirmed: { label: "Confirmed", color: "hsl(var(--chart-2))" },
                  cancelled: { label: "Cancelled", color: "hsl(var(--chart-3))" },
                }}
                className="min-h-[100px]"
              >
                <PieChart                     margin={{ top: 50,left: 60 }}
                >
                  <Pie
                    data={reservationStatusBreakdown}
                    dataKey="value"
                    nameKey="status"
                    cx="30%"
                    cy="30%"
                    outerRadius={60}
                    fill="var(--color-pending)"
                    label
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Admindashboard;    