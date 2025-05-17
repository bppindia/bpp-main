import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import apiClient from '@/api/apiClient'

interface ApiResponse {
    success: boolean
    data: MembershipDetails
}

interface MembershipDetails {
    membership: {
        id: string
        type: string
        status: string
        paymentStatus: string
        amount: number
        membershipNumber: string
        validity: {
            startDate: string
            expiryDate: string
        }
        createdAt: string
        updatedAt: string
    }
    user: {
        firstName?: string
        lastName?: string
        email?: string
        phone?: string
        dateOfBirth?: string
        address?: {
            line1?: string
            line2?: string
            cityOrVillage?: string
            district?: string
            state?: string
            pincode?: string
        }
        profilePicture?: string
    }
}

function formatDate(date: string | Date) {
    if (!date) return ''
    return format(new Date(date), 'dd/MM/yyyy')
}

export default function MembershipDetails() {
    const { membershipId } = useParams({ from: '/_public/membership/details/$membershipId' })

    const { data: response, isLoading, error } = useQuery<ApiResponse>({
        queryKey: ['membership', membershipId],
        queryFn: async () => {
            const response = await apiClient.get(`/users/membership/details/${membershipId}`)
            return response.data
        },
    })

    if (isLoading) {
        return <MembershipDetailsSkeleton />
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-red-500">Failed to load membership details</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!response?.success || !response?.data?.user || !response?.data?.membership) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-red-500">No membership details available</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const { membership, user } = response.data

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Membership Card */}
                <div className="bg-gradient-to-r from-[#dbeafe] to-[#93c5fd] rounded-xl shadow-xl overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Section - Photo and Basic Info */}
                            <div className="md:w-1/3 flex flex-col items-center">
                                {user?.profilePicture ? (
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        <span className="text-4xl text-gray-400">👤</span>
                                    </div>
                                )}
                                <div className="text-center text-gray-800">
                                    <h2 className="text-xl font-bold">
                                        {[user?.firstName, user?.lastName].filter(Boolean).join(' ')}
                                    </h2>
                                    <p className="text-sm opacity-90">{ membership.type } MEMBER</p>
                                </div>
                            </div>

                            {/* Right Section - Membership Details */}
                            <div className="md:w-2/3 bg-white/20 backdrop-blur-sm rounded-lg p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-700 text-sm">Membership Number</p>
                                        <p className="text-gray-900 font-bold text-lg">{membership.membershipNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-sm">Type</p>
                                        <p className="text-gray-900 font-bold text-lg">{membership.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-sm">Status</p>
                                        <p className="text-gray-900 font-bold text-lg">{membership.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-sm">Payment Status</p>
                                        <p className="text-gray-900 font-bold text-lg">{membership.paymentStatus}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-sm">Valid From</p>
                                        <p className="text-gray-900 font-bold text-lg">{formatDate(membership.validity.startDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-sm">Valid Until</p>
                                        <p className="text-gray-900 font-bold text-lg">{formatDate(membership.validity.expiryDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                                    <div className="space-y-2">
                                        {user?.email && (
                                            <p>
                                                <span className="font-medium">Email:</span> {user.email}
                                            </p>
                                        )}
                                        {user?.phone && (
                                            <p>
                                                <span className="font-medium">Phone:</span> {user.phone}
                                            </p>
                                        )}
                                        {user?.dateOfBirth && (
                                            <p>
                                                <span className="font-medium">Date of Birth:</span>{' '}
                                                {formatDate(user.dateOfBirth)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="space-y-4">

                                {user?.address && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Address</h3>
                                        <div className="space-y-2">
                                            {user.address.line1 && <p>{user.address.line1}</p>}
                                            {user.address.line2 && <p>{user.address.line2}</p>}
                                            {user.address.cityOrVillage && <p>{user.address.cityOrVillage}</p>}
                                            {(user.address.district || user.address.state) && (
                                                <p>
                                                    {[user.address.district, user.address.state].filter(Boolean).join(', ')}
                                                </p>
                                            )}
                                            {user.address.pincode && <p>{user.address.pincode}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function MembershipDetailsSkeleton() {
    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-6 w-40" />
                                <div className="mt-2 space-y-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-6 w-40" />
                                <div className="mt-2 space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 