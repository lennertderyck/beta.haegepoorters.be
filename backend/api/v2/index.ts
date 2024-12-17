import dayjs from "dayjs";
import 'dayjs/locale/nl-be';
import { client } from "../../services/sanity";
import api from "../server";

dayjs.locale('nl-be');

api.get('/v2/preflight', (_req, res) => {
  res.json({
    status: 'ok',
    startOfWeek: dayjs().startOf('week').format('DD MM YYYY'),
  })
})

api.get('/v2/groups', async (_req, res) => {
  const groups = await client.fetch('*[_type == "group"] | order(order asc)');
  return res.json(groups);
});

api.get('/v2/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const response = await client.fetch(`
    {
      "group": *[_type == "group" && abbr == $group][0]
    }
  `, {
    group: groupId,
  })
  
  return res.json(response);
});

api.get('/v2/groups/:groupId/activities', async (req, res) => {
  const { groupId } = req.params;
  const startDate = String(req.query.startDate) ?? undefined;
  const endDate = String(req.query.endDate) ?? undefined;
  const response = await client.fetch(`
    *[_type == "group" && abbr == $group][0]{
      "group": @,
      "activities": *[_type == "activity" && group._ref in *[_type == "group" && abbr == $group]._id && startDate >= $startDate && startDate <= $endDate] | order(startDate asc) 
    }
  `, {
    group: groupId,
    startDate: dayjs(startDate).startOf('month'),
    endDate: dayjs(endDate).endOf('month'),
  })
  
  return res.json(response);
});

api.get('/v2/activities/timeline', async (req, res) => {
  const startDate = String(req.query.startDate) ?? undefined;
  const endDate = String(req.query.endDate) ?? undefined;
  const activitiesForNextWeek = await client.fetch(`
    {
      "timelineForGroups": *[_type == "group"] | order(order asc){
        "group": @,
        "upcomingActivities": *[_type == "activity" && references(^._id) && startDate >= $startDate && startDate <= $endDate] | order(startDate asc)
      },
      "range": {
        "startDate": $startDate,
        "endDate": $endDate,
      }
    }
  `, {
    startDate: dayjs(startDate).startOf('month'),
    endDate: dayjs(endDate).endOf('month'),
  });
  
  return res.json(activitiesForNextWeek);
});

api.get('/v2/activities/timeline/preview', async (_req, res) => {
  const activitiesForNextWeek = await client.fetch(`
    {
      "timelineForGroups": *[_type == "group"] | order(order asc){
        "group": @,
        "upcomingActivity": *[_type == "activity" && references(^._id) && startDate >= $startDate] | order(startDate asc)[0]
      }
    }
  `, {
    startDate: dayjs().startOf('week'),
  });
  
  return res.json(activitiesForNextWeek);
});

api.get('/v2/activities/:activityId', async (req, res) => {
  const { activityId } = req.params;
  const activity = await client.fetch(`
    *[_type == "activity" && _id == $activityId][0]
  `, {
    activityId,
  });
  
  return res.json(activity);
});

api.post('/v2/activities', async (req, res) => {
  const { group, startDate, endDate, title, type, body } = req.body;
  const groupResponse = await client.fetch(`
    *[_type == "group" && abbr == $group || _id == $group][0]`,
    {
      group,
    }
  )
  const groupId = groupResponse._id;
  const response = await client.create({
    _type: 'activity',
    group: {
      _type: 'reference',
      _ref: groupId,
    },
    startDate,
    endDate,
    title,
    type,
    body,
  });
  
  return res.json(response);
});

api.patch('/v2/activities/:activityId', async (req, res) => {
  const { activityId } = req.params;
  const { startDate, endDate, title, type, body } = req.body;
  const response = await client.patch(activityId).set({
    startDate,
    endDate,
    title,
    type,
    body,
  }).commit();
  
  return res.json(response);
});

api.delete('/v2/activities/:activityId', async (req, res) => {
  const { activityId } = req.params;
  const response = await client.delete(activityId);
  
  return res.json(response);
});