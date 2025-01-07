
const PresidentMessage = () => {
    return (
        <div className="relative h-full py-24 flex flex-col justify-center items-center px-4 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                {/* Title */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold" style={{color: '#e7003b'}}>
                    A message from the Party's President.
                </h1>

                {/* Message Content */}
                <div className="space-y-3">
                    <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
                        I'd like to extend a heartfelt thanks to you for your trust in joining the party. Your
                        support is truly appreciated.
                    </p>

                    <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
                        I promise to stay committed to the party's goals like creating jobs for all, empowering
                        farmers, ensuring equality for everyone, and more. Above all, community
                        contribution will always be at the top of our priorities.
                    </p>

                    <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
                        Together, let us begin the change and build a brighter, stronger future for all.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PresidentMessage