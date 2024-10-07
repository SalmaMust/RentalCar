


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

export default function ListReservation() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link to="#" >
          <CarIcon className="h-8 w-8" />
          <span className="sr-only">Rental Car App</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 bg-muted py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_300px] gap-8">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Reserve Your Rental Car</h1>
              <p className="text-muted-foreground">Find the perfect car for your next adventure.</p>
            </div>
            <form className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickup-location">Pickup Location</Label>
                  <Input id="pickup-location" placeholder="Enter location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dropoff-location">Drop-off Location</Label>
                  <Input id="dropoff-location" placeholder="Enter location" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickup-date">Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button id="pickup-date" variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        Select date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar initialFocus mode="single" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dropoff-date">Drop-off Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="dropoff-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        Select date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar initialFocus mode="single" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button size="lg" className="w-full">
                Search Cars
              </Button>
            </form>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold">Available Cars</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <Card>
                    <CardContent className="grid gap-4">
                      <img
                        src="/placeholder.svg"
                        width={300}
                        height={200}
                        alt="Car Model"
                        className="rounded-lg object-cover aspect-video"
                      />
                      <div className="grid gap-1">
                        <div className="font-semibold">Toyota Corolla</div>
                        <div className="text-muted-foreground">Compact Sedan</div>
                        <div className="font-bold">$50/day</div>
                      </div>
                      <Button size="sm" className="w-full">
                        Reserve
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="grid gap-4">
                      <img
                        src="/placeholder.svg"
                        width={300}
                        height={200}
                        alt="Car Model"
                        className="rounded-lg object-cover aspect-video"
                      />
                      <div className="grid gap-1">
                        <div className="font-semibold">Honda Civic</div>
                        <div className="text-muted-foreground">Compact Sedan</div>
                        <div className="font-bold">$55/day</div>
                      </div>
                      <Button size="sm" className="w-full">
                        Reserve
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="grid gap-4">
                      <img
                        src="/placeholder.svg"
                        width={300}
                        height={200}
                        alt="Car Model"
                        className="rounded-lg object-cover aspect-video"
                      />
                      <div className="grid gap-1">
                        <div className="font-semibold">Ford Mustang</div>
                        <div className="text-muted-foreground">Sports Coupe</div>
                        <div className="font-bold">$75/day</div>
                      </div>
                      <Button size="sm" className="w-full">
                        Reserve
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="grid gap-4">
                      <img
                        src="/placeholder.svg"
                        width={300}
                        height={200}
                        alt="Car Model"
                        className="rounded-lg object-cover aspect-video"
                      />
                      <div className="grid gap-1">
                        <div className="font-semibold">Jeep Wrangler</div>
                        <div className="text-muted-foreground">Midsize SUV</div>
                        <div className="font-bold">$80/day</div>
                      </div>
                      <Button size="sm" className="w-full">
                        Reserve
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Rental Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Pickup Location</div>
                    <div>San Francisco, CA</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Pickup Date</div>
                    <div>April 15, 2024</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Drop-off Location</div>
                    <div>San Francisco, CA</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Drop-off Date</div>
                    <div>April 22, 2024</div>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Rental Days</div>
                    <div>7</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Daily Rate</div>
                    <div>$50</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Total</div>
                    <div className="font-bold">$350</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full">
                  Reserve Car
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <p className="text-sm">&copy; 2024 Rental Car App. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function CarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}