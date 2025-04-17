"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getDealshipInfo() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("Unauthorized ");
    let dealership = await db.dealershipInfo.findFirst({
      include: {
        workingHours: {
          orderBy: {
            dayofweek: "asc",
          },
        },
      },
    });

    if (!dealership) {
      dealership = await db.dealershipInfo.create({
        data: {
          workingHours: {
            create: [
              {
                dayofweek: "MONDAY",
                openTime: "08:00",
                closeTime: "18:00",
                isOpen: true,
              },
              {
                dayofweek: "TUESDAY",
                openTime: "08:00",
                closeTime: "18:00",
                isOpen: true,
              },
              {
                dayofweek: "WEDNESDAY",
                openTime: "08:00",
                closeTime: "18:00",
                isOpen: true,
              },
              {
                dayofweek: "THURSDAY",
                openTime: "08:00",
                closeTime: "18:00",
                isOpen: true,
              },
              {
                dayofweek: "FRIDAY",
                openTime: "08:00",
                closeTime: "18:00",
                isOpen: true,
              },
              {
                dayofweek: "SATURDAY",
                openTime: "09:00",
                closeTime: "17:00",
                isOpen: false,
              },
              {
                dayofweek: "SUNDAY",
                openTime: "09:00",
                closeTime: "17:00",
                isOpen: false,
              },
            ],
          },
        },
        include: {
          workingHours: {
            orderBy: {
              dayofweek: "asc",
            },
          },
        },
      });
    }
    return {
      success: true,
      data: {
        ...dealership,
        createdAt: dealership.createdAt.toISOString(),
        updatedAt: dealership.updatedAt.toISOString(),
      },
    };
  } catch (e) {
    throw new Error("Error fetching data ", e.message);
  }
}

export async function saveWorkingHours(workingHours) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized ");

    await db.workingHours.deleteMany({
      where: {
        dealershipId: dealership.id,
      },
    });

    for (const hours of workingHours) {
      await db.workingHours.create({
        data: {
          dayofweek: hours.dayOfweek,
          openTime: hours.openTime,
          closeTime: hours.closeTime,
          isOpen: hours.isOpen,
          dealershipId: dealership.id,
        },
      });
    }
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return {
      success: true,
    };
  } catch (e) {
    throw new Error("Error saving working hours data ", e.message);
  }
}

export async function getUsers() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized ");

    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      data: users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    };
  } catch (e) {
    throw new Error("Error fetching users data ", e.message);
  }
}

export async function updateUserRole(userId, role) {
  try {
    const { userId: adminId } = await auth();
    if (!adminId) {
      throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
      where: {
        clerkUserId: adminId,
      },
    });
    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized ");

    await db.user.updated({
      where: {
        id: userId,
      },
      data: { role },
    });
    revalidatePath("/admin/settings");
    return {
      success: true,
    };
  } catch (e) {
    throw new Error("Error updating user role ", e.message);
  }
}
