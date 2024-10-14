import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ListReservation() {
  return (
      
      <main className="flex-1 bg-muted py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Reserve Your Rental Car</h1>
              <p className="text-muted-foreground">Find the perfect car for your next adventure.</p>
            </div>
            <form className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickup-location">Pickup Location</Label>
                  <Input id="pickup-location" placeholder="Enter location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dropoff-location">Drop-off Location</Label>
                  <Input id="dropoff-location" placeholder="Enter location" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickup-date">Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button id="pickup-date" variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon />
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
                      <Button id="dropoff-date" variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon />
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
              <h2 className="text-2xl font-bold">Available Cars</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* Repeat for each car */}
                {[...Array(4)].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="grid gap-4">
                      <img src="/placeholder.svg" width={300} height={200} alt={`Car Model ${index + 1}`} className="rounded-lg object-cover aspect-video" />
                      <div className="grid gap-1">
                        <div className="font-semibold">Car Model {index + 1}</div>
                        <div className="text-muted-foreground">Car Type</div>
                        <div className="font-bold">$50/day</div>
                      </div>
                      <Button size="sm" className="w-full">Reserve</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Rental Summary Section */}
          <div className="grid gap-4 mt-6 md:mt-0">
            <Card>
              <CardHeader><CardTitle>Rental Summary</CardTitle></CardHeader>
              <CardContent className="grid gap-4">
                {/* Rental Details */}
                {/* Repeat for each detail */}
                {['Pickup Location', 'Pickup Date', 'Drop-off Location', 'Drop-off Date'].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-muted-foreground">{item}<span>Details Here</span></div>
                ))}
                {/* Separator and Total */}
                <Separator />
                {/* Total Calculation */}
                {['Rental Days', 'Daily Rate', 'Total'].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">{item}<span>$50</span></div> // Replace with actual values
                ))}
              </CardContent>
              <CardFooter><Button size="lg" className="w-full">Reserve Car</Button></CardFooter>
            </Card>
          </div>

        </div> 
      </main> 
  );
}

function CalendarDaysIcon() {
  
}