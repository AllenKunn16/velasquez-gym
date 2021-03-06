import { TController } from "~/types";
import { getFitnessById } from "~/services/fitness-service";
import { updateUser } from "~/services/user-service";

/**
 * Choose Fitness
 * 
 * @param request 
 * @param response 
 */
export const Put: TController = async (request, response) => {
  if (!request.session.userId) return;

  await updateUser(request.session.userId, { fitness: await getFitnessById(request.body.fitness_id) })

  response.status(200).json({
    success: true,
    message: 'Choose Fitness Success'
  });
}