import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/app/lib/prisma';

export async function fetchDeveloperGroupMembers(groupID: string) {
  noStore();

  try {
    return prisma.user.findMany({
      where: {
        group: groupID,
        role: 'DEVELOPER', // Ensure to fetch only developers
      },
      select: {
        id: true,
        name: true,
        email: true,
        // Add other fields you need
      },
    });
  } catch (e) {
    throw new Error('Failed to fetch developers');
  }
}

export async function fetchProjectByGroup(groupID: string) {
  noStore();

  try {
    return prisma.project.findMany({
      where: {
        group_owner: groupID,
      },
      select: {
        id: true,
        name: true,
        description: true,
        // Add other fields you need
      },
    });
  } catch (e) {
    throw new Error('Failed to fetch project information');
  }
}

export async function fetchProjectData(projectId: string) {
  const projectData = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      lineChartData: true,
      barChartData: true,
      singleValueData: true,
      tableData: true,
      textData: true,
      layout: true,
    },
  });
  return projectData;
}

type LineChartData = { data: any };
type BarChartData = { data: any };
type SingleValueData = { value: number };
type TableData = { data: any };
type TextData = { text: string };
type DashboardLayout = { layout: any };

interface ProjectData {
  lineChartData?: LineChartData[];
  barChartData?: BarChartData[];
  singleValueData?: SingleValueData;
  tableData?: TableData[];
  textData?: TextData;
  layout?: DashboardLayout;
}

export async function updateProjectData(projectId: string, data: ProjectData) {
  try {
    // Update LineChartData
    if (data.lineChartData) {
      await prisma.lineChartData.upsert({
        where: { projectId },
        update: { data: data.lineChartData },
        create: { projectId, data: data.lineChartData }
      });
    }

    // Update BarChartData
    if (data.barChartData) {
      await prisma.barChartData.upsert({
        where: { projectId },
        update: { data: data.barChartData },
        create: { projectId, data: data.barChartData }
      });
    }

    // Update SingleValueData
    if (data.singleValueData) {
      await prisma.singleValueData.upsert({
        where: { projectId },
        update: { value: data.singleValueData.value },
        create: { projectId, value: data.singleValueData.value }
      });
    }

    // Update TableData
    if (data.tableData) {
      await prisma.tableData.upsert({
        where: { projectId },
        update: { data: data.tableData },
        create: { projectId, data: data.tableData }
      });
    }

    // Update TextData
    if (data.textData) {
      await prisma.textData.upsert({
        where: { projectId },
        update: { text: data.textData.text },
        create: { projectId, text: data.textData.text }
      });
    }

    // Update DashboardLayout
    if (data.layout) {
      await prisma.dashboardLayout.upsert({
        where: { projectId },
        update: { layout: data.layout.layout },
        create: { projectId, layout: data.layout.layout }
      });
    }

    return { message: 'Successfully updated project data.' };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update project data.');
  }
}
